import React, { useCallback, useEffect, useMemo, useState } from "react";
import Home from "../Home";
import listsApi from "../../../api/listsApi";
import CustomDivider from "../../components/CustomDivider";
import { ListItemInterface } from "../../../utils/types/product-response.type";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  setVendorTagsCount,
  vendorFilterSelector,
} from "../../redux/app/appSlice";
import Product from "../../components/Product";
import useApi from "../Layout/useList";

interface ListBuilderProps {
  currentList: any;
}

const ListBuilder: React.FC<ListBuilderProps> = ({ currentList }) => {
  const dispatch = useAppDispatch();
  const [listItems, setListItems] = useState<ListItemInterface[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const { setError } = useApi();

  const vendorFilter = useAppSelector(vendorFilterSelector);

  const fetchListItems = useCallback(async (listId: string) => {
    setLoading(true);
    try {
      const listItemsData = await listsApi.getListItemsByListId(listId);
      setListItems(listItemsData);
    } catch (err: any) {
      console.error(err.message);
      setError("Failed to fetch list items");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentList && currentList.itemsCount > 0) {
      fetchListItems(currentList.id);
    } else {
      setListItems([]);
    }
  }, [currentList, fetchListItems]);

  const updateTagsCount = useCallback(() => {
    const tags = {
      "US Foods": 0,
      Sysco: 0,
      all: listItems.length, // Set the count for "All Vendors" to the total length of listItems
      ...listItems.reduce((acc: any, item: ListItemInterface) => {
        const vendorName = item.product.vendor;
        acc[vendorName] = (acc[vendorName] || 0) + 1;
        return acc;
      }, {}),
    };
    return tags;
  }, [listItems]);

  useEffect(() => {
    const tagsCount = updateTagsCount();
    Object.entries(tagsCount).forEach(([vendorName, count]) => {
      dispatch(setVendorTagsCount({ vendorName, count: count as number }));
    });
  }, [listItems, updateTagsCount, dispatch]);

  // Memoized filtered list items
  const filteredListItems = useMemo(() => {
    return listItems.filter(
      (item) => vendorFilter === "all" || item.product.vendor === vendorFilter
    );
  }, [listItems, vendorFilter]);

  const updateListItemQuantityInState = useCallback(
    ({
      saleUnitQuantityId,
      quantity,
      listItemId,
    }: {
      saleUnitQuantityId: string;
      quantity: number;
      listItemId: string;
    }) => {
      setListItems((prevListItems) =>
        prevListItems.map((item) => {
          if (item.id === listItemId) {
            const updatedSaleUnitQuantities = item.saleUnitQuantities.map(
              (unit) => {
                if (unit._id === saleUnitQuantityId) {
                  return { ...unit, quantity };
                }
                return unit;
              }
            );

            return { ...item, saleUnitQuantities: updatedSaleUnitQuantities };
          }
          return item;
        })
      );
    },
    []
  );

  const removeListItemFromState = useCallback((listItemId: string) => {
    setListItems((prevListItems) =>
      prevListItems.filter((item) => item.id !== listItemId)
    );
  }, []);

  return (
    <>
      {currentList.itemsCount === 0 ? (
        <Home />
      ) : (
        <div className="bg-[#F5F5F5] flex-grow flex flex-col overflow-y-auto">
          {loading ? (
            <p className="flex flex-1 justify-center items-center">
              Loading...
            </p>
          ) : filteredListItems.length > 0 ? (
            filteredListItems.map((item, index) => (
              <div key={index}>
                <Product
                  listItem={item}
                  removeListItemFromState={removeListItemFromState}
                  updateListItemQuantityInState={updateListItemQuantityInState}
                />
                <CustomDivider orientation="horizontal" />
              </div>
            ))
          ) : (
            <p className="flex flex-1 justify-center items-center">
              No products with this filter
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ListBuilder;

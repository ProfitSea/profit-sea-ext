import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Home from "../Home";
import listsApi from "../../../api/listsApi";
import CustomDivider from "../../components/CustomDivider";
import {
  ListInterface,
  ListItemInterface,
} from "../../../utils/types/product-response.type";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  setVendorTagsCount,
  vendorFilterSelector,
} from "../../redux/app/appSlice";
import { setListItems as setListItemsInRedux } from "../../redux/lists/listsSlice";
import Product from "../../components/Product";
import { listItemsSelector } from "../../redux/lists/listsSlice";
import { MessagingActions } from "../../../utils/actions/messagingActions.enum";

interface ListBuilderProps {
  currentList: any;
  setError: (error: string) => void;
}

const ListBuilder: React.FC<ListBuilderProps> = ({ currentList, setError }) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<Boolean>(false);

  const vendorFilter = useAppSelector(vendorFilterSelector);
  const listItems = useAppSelector(listItemsSelector);
  const setListItems = (listItems: ListItemInterface[]) => {
    dispatch(setListItemsInRedux(listItems));
  };
  const prevListRef = useRef<ListInterface>();

  const fetchListItems = useCallback(async (listId: string) => {
    setLoading(true);
    try {
      const listItemsData = await listsApi.getListItemsByListId(listId);
      setListItems(listItemsData);
    } catch (err: any) {
      console.error("ListBuilder", err);
      setError(`Failed to fetch list items:  ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!currentList.id) return;

    const prevList = prevListRef.current;

    if (prevList?.id) {
      if (!currentList.id) {
        setListItems([]);
      } else if (prevList.id !== currentList.id) {
        fetchListItems(currentList.id);
      }
    }
    if (!prevList?.id && currentList.id) {
      fetchListItems(currentList.id);
    }

    // Update the ref to the current value
    prevListRef.current = currentList;
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
    if (listItems?.length > 0) {
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (
          message.action === MessagingActions.UPDATE_LIST_ITEM_IN_LIST_ITEMS
        ) {
          const updatedListItems = listItems.map(
            (listItem: ListItemInterface) => {
              if (listItem.id === message.listItem.id) {
                return message.listItem;
              }
              return listItem;
            }
          );
          setListItems(updatedListItems);
        }
      });
    }
  }, [listItems, updateTagsCount, dispatch]);

  // Memoized filtered list items
  const filteredListItems = useMemo(() => {
    return listItems.filter(
      (item) => vendorFilter === "all" || item.product.vendor === vendorFilter
    );
  }, [listItems, vendorFilter]);

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
                <Product listItem={item} />
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

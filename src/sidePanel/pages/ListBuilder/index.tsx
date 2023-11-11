import React, { useEffect, useState } from "react";
import Home from "../Home";
import listsApi from "../../../api/listsApi";
import Product from "./Product";
import CustomDivider from "../../components/CustomDivider";
import { ListItemInterface } from "../../../utils/types/product-response.type";

interface ListBuilderProps {
  currentList: any;
  vendorFilter: string | null;
  productFilter: string | null;
}

const ListBuilder: React.FC<ListBuilderProps> = ({
  currentList,
  vendorFilter,
  productFilter,
}) => {
  const [listItems, setListItems] = useState<ListItemInterface[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [filteredListItems, setFilteredListItems] = useState<ListItemInterface[]>([]);

  useEffect(() => {
    if (listItems.length > 0) {
      const filteredListItems = listItems.filter(({ product }: any) => {
        if (vendorFilter === "all") {
          return true;
        } else {
          return product.vendor === vendorFilter;
        }
      });
      setFilteredListItems(filteredListItems);
    }
  }, [listItems, vendorFilter]);

  const fetchListItems = async (listId: string) => {
    try {
      setLoading(true);
      const listItemsData = await listsApi.getListItemsByListId(listId);
      setListItems(listItemsData);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentList.itemsCount > 0) {
      fetchListItems(currentList.id);
    }
  }, [currentList]);

  if (currentList.itemsCount > 0)
    return (
      <div className="bg-[#F5F5F5] flex-grow flex flex-col overflow-y-auto">
        {loading ? (
          <p className="flex flex-1 justify-center items-center">Loading...</p>
        ) : (
          filteredListItems.map((item, index) => (
            <div key={index}>
              <Product listItem={item} deleteProduct={() => {}} />
              <CustomDivider orientation="horizontal" />
            </div>
          ))
        )}
      </div>
    );
  else {
    return <Home />;
  }
};

export default ListBuilder;

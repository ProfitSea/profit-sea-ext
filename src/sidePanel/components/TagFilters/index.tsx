import React, { useState } from "react";
import Tags from "./Tags";
import { productTagsData } from "../../../utils/data/productTags.data";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { updateVendorTags, vendorTagsSelector } from "../../redux/app/appSlice";

interface TagFiltersProps {
  setVendorFilter: (value: string) => void;
  setProductFilter: any;
}

const TagFilters: React.FC<TagFiltersProps> = ({
  setVendorFilter,
  setProductFilter,
}) => {
  const dispatch = useAppDispatch();
  const vendorTags = useAppSelector(vendorTagsSelector);
  const setVendorTags = (value: TagType[]) => {
    dispatch(updateVendorTags(value));
  };
  const [productTags, setProductTags] = useState(productTagsData);

  return (
    <div className="flex-none h-[100px] bg-[#F5F5F5] flex flex-col items-start justify-center px-[8px] gap-[12px] overflow-x-auto">
      <Tags
        tags={vendorTags}
        setTags={setVendorTags}
        setFilter={setVendorFilter}
      />
      <Tags
        tags={productTags}
        setTags={setProductTags}
        setFilter={setProductFilter}
      />
    </div>
  );
};

export default TagFilters;

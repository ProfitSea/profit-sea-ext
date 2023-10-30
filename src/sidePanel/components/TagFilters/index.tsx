import React, { useState } from "react";
import Tags from "./Tags";
import { vendorsTagsData } from "../../../utils/data/vendorTags.data";
import { productTagsData } from "../../../utils/data/productTags.data";

interface TagFiltersProps {
  setVendorFilter: any;
  setProductFilter: any;
}

const TagFilters: React.FC<TagFiltersProps> = ({
  setVendorFilter,
  setProductFilter,
}) => {
  const [vendorTags, setVendorTags] = useState(vendorsTagsData);
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

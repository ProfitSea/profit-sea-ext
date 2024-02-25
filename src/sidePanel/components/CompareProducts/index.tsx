import React, { useState } from "react";
import { ListItemInterface } from "../../../utils/types/product-response.type";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ProductsListModal from "./ProductListModal";
const ProductImage = React.lazy(() => import("./ProductImage"));
const ProductDescription = React.lazy(() => import("./ProductDescription"));

interface CompareProductsProps {
  listItem: ListItemInterface;
}

const CompareProducts: React.FC<CompareProductsProps> = ({ listItem }) => {
  const { product } = listItem;
  const [open, setOpen] = useState(false);

  return (
    <div className="w-[100%] bg-white flex-col justify-start items-start gap-2.5 inline-flex">
      <div className="self-stretch px-3.5 py-[17px] bg-white flex-col justify-start items-start gap-3.5 flex">
        <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
          <ProductImage src={product.imgSrc} />
          <ProductDescription
            vendor={product.vendor}
            brand={product.brand}
            description={product.description}
            productNumber={product.productNumber}
            packSize={product.packSize}
          />
        </div>
      </div>
      <div
        onClick={() => setOpen(true)}
        className="bg-[#F5F5F5] px-3.5 py-2 w-[100%] flex-row justify-start items-center gap-3.5 inline-flex cursor-pointer"
      >
        <AddBoxOutlinedIcon className="text-[#8391A1] text-[25px]" />
        <p className="text-[13px]">Add a product to compare side by side</p>
      </div>
      <ProductsListModal open={open} setOpen={setOpen} listItem={listItem} />
    </div>
  );
};

export default CompareProducts;

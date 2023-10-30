import React from "react";
import CustomDivider from "../../components/CustomDivider";
import Product from "./Product";

const ProductsType = () => {
  return (
    <div className="flex-grow bg-[#F5F5F5] flex flex-col overflow-y-auto">
      <Product />
      <CustomDivider orientation="horizontal" />
      <Product />
    </div>
  );
};

export default ProductsType;

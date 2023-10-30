import React from "react";
import CustomDivider from "../../components/CustomDivider";
import AnalysisProduct from "./AnalysisProduct";

const ProductsAnalysis = () => {
  return (
    <div className="bg-[#F5F5F5] flex-grow flex flex-col overflow-y-auto">
      <AnalysisProduct />
      <CustomDivider orientation="horizontal" />
      <AnalysisProduct />
      <CustomDivider orientation="horizontal" />
      <AnalysisProduct />
      <CustomDivider orientation="horizontal" />
      <AnalysisProduct />
    </div>
  );
};

export default ProductsAnalysis;

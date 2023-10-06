import React from "react";
import { useNavigate } from "react-router-dom";
import { productTagsData } from "../../../utils/data/productTags.data";
import { vendorsTagsData } from "../../../utils/data/vendorTags.data";
import BreadCrumbs from "../../components/BreadCrumbs";
import CustomButton from "../../components/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Tags from "../../components/Tags";
import Product from "./Product";

const ProductsType = () => {
  const navigate = useNavigate();
  const [vendorTags, setVendorTags] = React.useState(vendorsTagsData);
  const [productTags, setProductTags] = React.useState(productTagsData);
  const [vendorFilter, setVendorFilter] = React.useState<string | null>(null);
  const [productFilter, setProductFilter] = React.useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col">
        <CustomDivider orientation="horizontal" />
        <div className="flex-none h-[40px] flex items-center justify-start px-[8px] gap-[12px]">
          <p className="text-lg">Main Order Guide (72 Items)</p>
          <img src="/assets/icons/pen.png" className="w-[18px]" alt="edit" />
        </div>
        <CustomDivider orientation="horizontal" />
        <BreadCrumbs />
        <CustomDivider orientation="horizontal" />
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
        <CustomDivider orientation="horizontal" />
        <div className="flex-grow bg-[#F5F5F5] flex flex-col overflow-y-auto">
          <Product />
          <CustomDivider orientation="horizontal" />
          <Product />
        </div>
        <CustomDivider orientation="horizontal" />
        <div className="h-[60px] px-[10px] flex items-center justify-center">
          <CustomButton
            title="Continue to Analysis"
            bgColor="#FBBB00"
            textColor="white"
            onClick={() => {
              navigate("/productsAnalysis");
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsType;

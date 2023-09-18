import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import CustomButton from "../../components/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import Header from "../../components/Header";
import Product from "./Product";
import Tags from "../../components/Tags";

const ProductsType = () => {
  const [vendorTags, setVendorTags] = React.useState([
    {
      id: 1,
      name: "All Vendors",
      active: true,
      count: 72,
      icon: "discount",
    },
    {
      id: 2,
      name: "US Foods",
      active: false,
      count: 46,
      icon: "discount",
    },
    {
      id: 3,
      name: "Sysco",
      active: false,
      count: 26,
      icon: "discount",
    },
  ]);

  const [productTags, setProductTags] = React.useState([
    {
      id: 1,
      name: "All Products",
      active: true,
      count: 72,
      icon: "anchor",
    },
    {
      id: 2,
      name: "Anchors",
      active: false,
      count: 46,
      icon: "anchor",
    },
    {
      id: 3,
      name: "Hooks",
      active: false,
      count: 26,
      icon: "anchor",
    },
  ]);

  return (
    <div className="">
      <Header />
      <CustomDivider orientation="horizontal" />
      <div className="h-[40px] flex items-center justify-start px-[8px] gap-[12px]">
        <p className="text-lg">Main Order Guide (72 Items)</p>
        <img src="/assets/icons/pen.png" className="w-[18px]" alt="edit" />
      </div>
      <CustomDivider orientation="horizontal" />
      <BreadCrumbs />
      <CustomDivider orientation="horizontal" />
      <div className="h-[100px] bg-[#F5F5F5] flex flex-col items-start justify-center px-[8px] gap-[12px] overflow-x-auto">
        <Tags tags={vendorTags} setTags={setVendorTags} />
        <Tags tags={productTags} setTags={setProductTags} />
      </div>
      <CustomDivider orientation="horizontal" />
      <div className="h-[380px] bg-[#F5F5F5] flex flex-col overflow-y-auto">
        <Product />
        <CustomDivider orientation="horizontal" />
        <Product />
        <CustomDivider orientation="horizontal" />
        <Product />
        <CustomDivider orientation="horizontal" />
        <Product />
      </div>
      <CustomDivider orientation="horizontal" />
      <div className="h-[60px] px-[10px] flex items-center justify-center">
        <CustomButton
          title="Continue to Product Type"
          bgColor="#FBBB00"
          textColor="white"
          onClick={() => {}}
        />
      </div>
      <div className="text-[#FBBB00] px-[12px] flex flex-row gap-[20px]">
        <p className="">How it works</p>
        <p>Privacy Policy</p>
      </div>
    </div>
  );
};

export default ProductsType;

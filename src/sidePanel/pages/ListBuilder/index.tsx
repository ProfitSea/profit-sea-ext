import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import CustomButton from "../../components/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import Header from "../../components/Header";
import Product from "./Product";
import Tags from "../../components/Tags";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import ProductInterface from "../../utils/product.interface";

const ListBuilder = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([
    {
      vendor: "US Foods",
      imgSrc: "https://order.usfoods.com/assets/images/separator.png",
      brand: "Packer",
      description: 'Potato, French-fry 1/2" Crinkle-cut Frozen',
      productNumber: "#3351426",
      packSize: "6/5 LB",
      prices: [
        {
          price: 28.99,
          unit: "CS",
        },
      ],
    },
    {
      vendor: "US Foods",
      imgSrc:
        "https://assets.usfoods.com/Product/Image/1651388/ff5886462aea11933cd9bfe240a59006.jpg",
      brand: "Superior / Ces",
      description: "Apron, Waist 25x11 Polyester Cotton Black 3 Pocket",
      productNumber: "#8503047",
      packSize: "1 EA",
      prices: [
        {
          price: 12.5,
          unit: "EA",
        },
      ],
    },
  ] as ProductInterface[]);
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

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    debugger;
    if (message.action === "recieve_New_Product") {
      // Perform your logic here
      setProducts([...products, message.payload]);
    }
  });

  const deleteProduct = (productNumber: ProductInterface["productNumber"]) => {
    const newProducts = products.filter(
      (p) => p.productNumber !== productNumber
    );
    setProducts(newProducts);
  };

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
          <Tags tags={vendorTags} setTags={setVendorTags} />
          <Tags tags={productTags} setTags={setProductTags} />
        </div>
        <CustomDivider orientation="horizontal" />
        <div className="bg-[#F5F5F5] flex-grow flex flex-col overflow-y-auto">
          {products.map((product: any, index: number) => (
            <div key={index}>
              <Product product={product} deleteProduct={deleteProduct} />
              <CustomDivider orientation="horizontal" />
            </div>
          ))}
        </div>
        <CustomDivider orientation="horizontal" />
        <div className="h-[60px] px-[10px] flex items-center justify-center">
          <CustomButton
            title="Continue to Product Type"
            bgColor="#FBBB00"
            textColor="white"
            onClick={() => {
              navigate("/productsType");
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListBuilder;

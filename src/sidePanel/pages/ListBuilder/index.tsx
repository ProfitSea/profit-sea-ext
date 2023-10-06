import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import productsApi from "../../../api/productsApi";
import { productTagsData } from "../../../utils/data/productTags.data";
import { vendorsTagsData } from "../../../utils/data/vendorTags.data";
import ProductInterface from "../../../utils/product.interface";
import BreadCrumbs from "../../components/BreadCrumbs";
import CustomButton from "../../components/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Tags from "../../components/Tags";
import Product from "./Product";

const ListBuilder = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([] as ProductInterface[]);
  const [loading, setLoading] = React.useState(false);
  const [vendorTags, setVendorTags] = React.useState(vendorsTagsData);
  const [productTags, setProductTags] = React.useState(productTagsData);
  const [vendorFilter, setVendorFilter] = React.useState<string | null>(null);
  const [productFilter, setProductFilter] = React.useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productsApi.getProducts({
        vendor: vendorFilter,
      });
      setProducts(res.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      debugger;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [vendorFilter]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = (productNumber: ProductInterface["productNumber"]) => {
    const newProducts = products.filter(
      (p: ProductInterface) => p.productNumber !== productNumber
    );
    setProducts(newProducts);
  };

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "refreshListBuilderProducts") {
      fetchProducts();
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header refresh refreshOnClick={fetchProducts} />
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
        <div className="bg-[#F5F5F5] flex-grow flex flex-col overflow-y-auto">
          {loading ? (
            <p className="flex flex-1 justify-center items-center">
              Loading...
            </p>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <div key={index}>
                <Product product={product} deleteProduct={deleteProduct} />
                <CustomDivider orientation="horizontal" />
              </div>
            ))
          ) : (
            <p className="flex flex-1 justify-center items-center">
              No products
            </p>
          )}
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

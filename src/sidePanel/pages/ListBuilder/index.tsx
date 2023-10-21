import React, { useState, useCallback, useEffect } from "react";
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

const defaultProducts: ProductInterface[] = [];

const ListBuilder = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState(defaultProducts);
  const [filteredProducts, setFilteredProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(false);
  const [vendorTags, setVendorTags] = useState(vendorsTagsData);
  const [productTags, setProductTags] = useState(productTagsData);
  const [vendorFilter, setVendorFilter] = useState<string | null>("all");
  const [productFilter, setProductFilter] = React.useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await productsApi.getProducts({});
      setProducts(res.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();

    const messageListener = (request: any) => {
      if (request.action === "refreshListBuilderProducts") {
        console.log("refreshing list builder products");
        fetchProducts();
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);
    return () => chrome.runtime.onMessage.removeListener(messageListener);
  }, [fetchProducts]);

  useEffect(() => {
    const newFilteredProducts =
      vendorFilter === "all"
        ? products
        : products.filter((product) => product.vendor === vendorFilter);
    setFilteredProducts(newFilteredProducts);
  }, [vendorFilter, products]);

  useEffect(() => {
    const updatedVendorTags = vendorTags.map((tag) => ({
      ...tag,
      count:
        tag.filterValue === "all"
          ? products.length
          : products.filter((product) => product.vendor === tag.filterValue)
              .length,
    }));
    setVendorTags(updatedVendorTags);
  }, [products]);

  const deleteProduct = useCallback(
    async (productId: string) => {
      try {
        await productsApi.deleteProduct(productId);
        fetchProducts();
      } catch (error) {
        console.log(error);
      }
    },
    [fetchProducts]
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header refreshOnClick={fetchProducts} />
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
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
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

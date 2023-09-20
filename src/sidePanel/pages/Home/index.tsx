import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import Header from "../../components/Header";
import CustomHomeButton from "./CustomHomeButton";
import BreadCrumbs from "../../components/BreadCrumbs";
import Footer from "../../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col">
        <CustomDivider orientation="horizontal" />
        <div className="flex-none h-[40px] flex items-center justify-start px-[8px] gap-[12px]">
          <p className="text-lg">New List Name</p>
          <img src="/assets/icons/pen.png" className="w-[18px]" alt="edit" />
        </div>
        <CustomDivider orientation="horizontal" />
        <BreadCrumbs />
        <CustomDivider orientation="horizontal" />
        <div className="flex-none h-[80px] bg-[#F5F5F5] flex justify-center items-center">
          {" "}
          <p className="px-[12px] text-center">
            Begin building your list or add your entire product guide from each
            vendor. Launch your vendor websites to get started.
          </p>
        </div>
        <CustomDivider orientation="horizontal" />
        <div className="flex-grow flex flex-col">
          <CustomHomeButton
            title="Open All Vendors"
            bgColor="#FBBB00"
            textColor="white"
            onClick={() => {}}
          />
          <CustomHomeButton
            title="Open US Foods"
            bgColor="#4A4A4A"
            textColor="white"
            onClick={() => {
              navigate("/listbuilder");
            }}
          />
          <CustomHomeButton
            title="Open Sysco"
            bgColor="#4A4A4A"
            textColor="white"
            onClick={() => {}}
          />
          <CustomHomeButton
            title="Open Performance Food Group"
            bgColor="#4A4A4A"
            textColor="white"
            onClick={() => {}}
          />
          <CustomHomeButton
            title="Open Gordon Foods"
            bgColor="#4A4A4A"
            textColor="white"
            onClick={() => {}}
          />
        </div>
        <div className="h-[60px] px-[10px] flex items-center justify-center">
          <CustomButton
            title="Create List"
            bgColor="#FBBB00"
            textColor="white"
            onClick={() => {}}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, MenuItem, Select } from "@mui/material";
import React from "react";
import CustomButton from "../../components/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import CustomHomeButton from "./CustomHomeButton";
import { useNavigate } from "react-router-dom";

const breadcrumbs = [
  <p key={1} className="text-[#FBBB00] text-xs" onClick={() => {}}>
    List Builder
  </p>,
  <p key={2} className="text-xs" onClick={() => {}}>
    Product Type
  </p>,
  <p key={3} className="text-xs" onClick={() => {}}>
    Product Analysis
  </p>,
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="h-[30px] flex items-center justify-start px-[8px] gap-[12px]">
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={10}
          onChange={() => {}}
          sx={{
            height: "25px",
            "& .MuiSelect-select": {
              fontSize: "11px",
            },
          }}
        >
          <MenuItem value={10}>New List Name</MenuItem>
        </Select>
        <img src="/assets/icons/map.png" className="w-[22px]" alt="map" />
        <img src="/assets/icons/anchor.png" className="w-[22px]" alt="anchor" />
      </div>
      <CustomDivider orientation="horizontal" />
      <div className="h-[40px] flex items-center justify-start px-[8px] gap-[12px]">
        <p className="text-lg">New List Name</p>
        <img src="/assets/icons/pen.png" className="w-[18px]" alt="edit" />
      </div>
      <CustomDivider orientation="horizontal" />
      <div className="h-[30px] flex items-center justify-start px-[8px]">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <CustomDivider orientation="horizontal" />
      <div className="h-[80px] bg-[#F5F5F5] flex justify-center items-center">
        {" "}
        <p className="px-[12px] text-center">
          Begin building your list or add your entire product guide from each
          vendor. Launch your vendor websites to get started.
        </p>
      </div>
      <CustomDivider orientation="horizontal" />
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
          navigate("/products");
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
      <div className="h-[60px] px-[10px] flex items-center justify-center">
        <CustomButton
          title="Create List"
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

export default Home;

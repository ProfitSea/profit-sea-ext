import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, MenuItem, Select } from "@mui/material";
import React from "react";
import CustomDivider from "../../components/CustomDivider";
import AnchorSvgIcon from "../../components/svg-icons/AnchorSvgIcon";
import DiscountSvgIcon from "../../components/svg-icons/DiscountSvgIcon";
import MapSvgIcon from "../../components/svg-icons/MapSvgIcon";

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

interface CustomTagProps {
  active: boolean;
  name: string;
  count: number;
  icon: React.ReactElement;
}

const CustomTag: React.FC<CustomTagProps> = ({ active, name, count, icon }) => {
  return (
    <div
      className={`h-9 px-2 py-1.5 ${
        active ? "bg-[#FBBB00] text-white" : "bg-[#EBEBEB] text-[#737373]"
      } rounded-2xl justify-start items-center gap-2 inline-flex`}
    >
      <div className="justify-start items-center gap-2 flex">
        <div className="w-4 h-4 text-xs relative">{icon}</div>
        <div className="w-[70px] text-xs font-normal font-['SF Pro Text'] leading-tight">
          {name}
        </div>
      </div>
      <div className="justify-center text-white items-center flex rounded-full bg-[#737373]">
        <div className="self-stretch p-[5px] flex-col justify-start items-center inline-flex">
          <div className="w-3.5 h-3.5 text-[12px] relative">{count}</div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
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
        <p className="text-lg">Main Order Guide (72 Items)</p>
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
      <div className="h-[100px] bg-[#F5F5F5] flex flex-col items-start justify-center px-[8px] gap-[12px] overflow-x-auto">
        <div className="flex flex-row gap-[12px]">
          <CustomTag
            name="All Vendors"
            active={true}
            count={72}
            icon={
              <DiscountSvgIcon
                customColor={true ? "white" : "#737373"}
                style={{
                  fontSize: "1rem",
                  verticalAlign: "inherit",
                }}
              />
            }
          />
          <CustomTag
            name="US Foods"
            active={false}
            count={46}
            icon={
              <DiscountSvgIcon
                customColor={false ? "white" : "#737373"}
                style={{
                  fontSize: "1rem",
                  verticalAlign: "inherit",
                }}
              />
            }
          />
          <CustomTag
            name="Sysco"
            active={false}
            count={26}
            icon={
              <DiscountSvgIcon
                customColor={false ? "white" : "#737373"}
                style={{
                  fontSize: "1rem",
                  verticalAlign: "inherit",
                }}
              />
            }
          />
        </div>
        <div className="flex flex-row gap-[12px]">
          <CustomTag
            name="All Products"
            active={true}
            count={72}
            icon={
              <AnchorSvgIcon
                customColor={true ? "white" : "#737373"}
                style={{
                  fontSize: "1rem",
                  verticalAlign: "inherit",
                }}
              />
            }
          />
          <CustomTag
            name="Anchors"
            active={false}
            count={46}
            icon={
              <AnchorSvgIcon
                customColor={false ? "white" : "#737373"}
                style={{
                  fontSize: "1rem",
                  verticalAlign: "inherit",
                }}
              />
            }
          />
          <CustomTag
            name="Hooks"
            active={false}
            count={26}
            icon={
              <img src="/assets/icons/map.svg" alt="map" />
            }
          />
        </div>
      </div>
      <CustomDivider orientation="horizontal" />
    </div>
  );
};

export default Products;

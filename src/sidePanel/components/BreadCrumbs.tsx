import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";

const BreadCrumbs = () => {
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
  return (
    <div className="flex-none h-[30px] flex items-center justify-start px-[8px]">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};
export default BreadCrumbs;

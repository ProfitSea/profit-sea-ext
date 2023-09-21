import React, { useState, useEffect } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    switch (location.pathname) {
      case "/home":
        setActiveIndex(0);
        break;
      case "/listbuilder":
        setActiveIndex(1);
        break;
      case "/productsType":
        setActiveIndex(2);
        break;
      case "/productsAnalysis":
        setActiveIndex(3);
        break;
      default:
        setActiveIndex(-1);
        break;
    }
  }, [location]);

  const breadcrumbs = [
    {
      label: "Home",
      path: "/home",
      onClick: () => {
        setActiveIndex(0);
        navigate("/home");
      },
    },
    {
      label: "List Builder",
      path: "/listbuilder",
      onClick: () => {
        setActiveIndex(1);
        navigate("/listbuilder");
      },
    },
    {
      label: "Product Type",
      path: "/productsType",
      onClick: () => {
        setActiveIndex(2);
        navigate("/productsType");
      },
    },
    {
      label: "Product Analysis",
      path: "/productsAnalysis",
      onClick: () => {
        setActiveIndex(3);
        navigate("/productsAnalysis");
      },
    },
  ];

  return (
    <div className="flex-none h-[30px] flex items-center justify-start px-[8px] py-[10px] overflow-x-auto whitespace-nowrap">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          "& .css-nhb8h9": {
            flexWrap: "nowrap",
          },
          "& .css-4pdmu4-MuiBreadcrumbs-ol": {
            flexWrap: "nowrap",
          },
        }}
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <p
            key={index}
            className={`text-xs ${
              index === activeIndex ? "text-[#FBBB00]" : ""
            } cursor-pointer`}
            onClick={breadcrumb.onClick}
          >
            {breadcrumb.label}
          </p>
        ))}
      </Breadcrumbs>
    </div>
  );
};
export default BreadCrumbs;

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface BreadCrumbsProps {
  page: string;
  setPage: Dispatch<SetStateAction<string>>;
}

interface PageToActiveIndex {
  [key: string]: number;
}

const pageToActiveIndex: PageToActiveIndex = {
  listbuilder: 0,
  productsType: 1,
  productsAnalysis: 2,
};

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ page, setPage }) => {
  const [activeIndex, setActiveIndex] = useState(pageToActiveIndex[page] || 0);

  useEffect(() => {
    setActiveIndex(pageToActiveIndex[page] || 0);
  }, [page]);

  const breadcrumbs = [
    {
      label: "List Builder",
      pageName: "listbuilder",
    },
    {
      label: "Product Type",
      pageName: "productsType",
    },
    {
      label: "Product Analysis",
      pageName: "productsAnalysis",
    },
  ];

  const handleBreadcrumbClick = (pageName: string) => {
    setPage(pageName);
  };

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
            onClick={() => handleBreadcrumbClick(breadcrumb.pageName)}
          >
            {breadcrumb.label}
          </p>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;

import React from "react";
import { MenuItem, Select } from "@mui/material";

const Header = () => {
  return (
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
  );
};

export default Header;

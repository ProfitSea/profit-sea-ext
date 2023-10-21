import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  refresh?: boolean;
  refreshOnClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ refresh = false, refreshOnClick }) => {
  const navigate = useNavigate();

  const logout = async () => {
    chrome.storage.local.remove("profit_sea_token");
    navigate("/login");
  };

  return (
    <div className="h-[40px] flex items-center justify-start px-[8px] gap-[12px]">
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
      {refresh && <button onClick={refreshOnClick}>Refresh</button>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Header;

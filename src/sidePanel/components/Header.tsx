import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  lists: any;
  selectValue: any;
  loading: boolean;
  setSelectValue: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  lists,
  selectValue,
  loading,
  setSelectValue,
}) => {
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
        value={loading ? 0 : selectValue}
        onChange={(e: SelectChangeEvent) => {
          setSelectValue(e.target.value as string);
        }}
        sx={{
          height: "25px",
          fontSize: "11px",
          width: "150px",        // Explicitly setting the width
          whiteSpace: "nowrap",  // Ensure no wrap of text
          overflow: "hidden",    // Hide overflowed text
          textOverflow: "ellipsis" // Add ellipsis to overflowed text
        }}
      >
        <MenuItem value={"0"}>
          <em>Select List</em>
        </MenuItem>
        <MenuItem value={"createNewList"}>+ New List</MenuItem>
        {loading ? (
          <MenuItem value={"loading"} disabled={true}>
            loading ...
          </MenuItem>
        ) : (
          lists.length > 0 &&
          lists.map((list: any) => (
            <MenuItem key={list.id} value={list.id}>
              <span className="font-medium">{list.name}</span>
              <span className="text-xs ml-[8px]">{`(${list.itemsCount} Items)`}</span>
            </MenuItem>
          ))
        )}
      </Select>
      <img src="/assets/icons/map.png" className="w-[22px]" alt="map" />
      <img src="/assets/icons/anchor.png" className="w-[22px]" alt="anchor" />
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Header;

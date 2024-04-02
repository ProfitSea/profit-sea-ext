import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import * as React from "react";

interface ProductSearchProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductSearch({ onChange }: ProductSearchProps) {
  return (
    <Box sx={{ display: "flex", margin: "10px 0px" }}>
      <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <input
        type="text"
        className="border-0 focus:border-0 focus:outline-none w-[100%]"
        placeholder="Name, description, or product number"
        onChange={onChange} // Use the passed onChange handler
      />
    </Box>
  );
}

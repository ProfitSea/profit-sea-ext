import React from "react";
import { Divider } from "@mui/material";

interface CustomDividerProps {
  orientation: "horizontal" | "vertical";
}

const CustomDivider: React.FC<CustomDividerProps> = ({ orientation }) => {
  return (
    <Divider
      sx={{
        "&::before, &::after": {
          borderColor: "#E8ECF4",
        },
      }}
      orientation={orientation}
      flexItem
      variant="fullWidth"
    ></Divider>
  );
};

export default CustomDivider;

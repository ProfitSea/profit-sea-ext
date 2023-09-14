import React from "react";
import Button from "@mui/material/Button";

interface CustomButtonProps {
  title: string;
  onClick: () => void;
  bgColor: string;
  textColor: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onClick,
  bgColor,
  textColor,
}) => {
  return (
    <Button
      sx={{
        width: "100%",
        height: "35px",
        backgroundColor: bgColor,
        padding: "21px 14px 21px 14px",
        borderRadius: "5px",
        fontSize: "11px",
        color: textColor,
        "&:hover": {
          backgroundColor: bgColor,
        },
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default CustomButton;

import { IconButton } from "@mui/material";
import React from "react";

interface ButtonTypeProps {
  imgSrc: string;
  altText: string;
  onClick: () => void;
  loading: boolean;
  tip?: string;
}

const ButtonType: React.FC<ButtonTypeProps> = ({
  imgSrc,
  altText,
  onClick,
  loading,
  tip,
}) => {
  return (
    <IconButton
      onClick={onClick}
      disabled={loading}
      className={`${loading ? "animate-spin" : ""}`}
      title={tip}
    >
      <img width={30} src={imgSrc} alt={altText} />
    </IconButton>
  );
};

export default ButtonType;

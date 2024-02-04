import React from "react";

interface ButtonTypeProps {
  imgSrc: string;
  altText: string;
  onClick: () => void;
  loading: boolean;
}

const ButtonType: React.FC<ButtonTypeProps> = ({
  imgSrc,
  altText,
  onClick,
  loading,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[30px] cursor-pointer ${loading && "cursor-progress"}`}
    >
      <img src={imgSrc} alt={altText} />
    </button>
  );
};

export default ButtonType;

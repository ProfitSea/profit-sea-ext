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
    <button
      onClick={onClick}
      className={`w-[30px] ${loading ? "cursor-progress" : "cursor-pointer"}`}
      disabled={loading}
      title={tip}
    >
      <img src={imgSrc} alt={altText} />
    </button>
  );
};

export default ButtonType;

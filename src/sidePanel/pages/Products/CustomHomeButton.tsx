import React from "react";
import CustomButton from "../../components/CustomButton";
import CustomDivider from "../../components/CustomDivider";

interface CustomHomeButtonProps {
  title: string;
  bgColor: string;
  textColor: string;
  onClick: () => void;
}

const CustomHomeButton: React.FC<CustomHomeButtonProps> = ({
  title,
  bgColor,
  textColor,
  onClick,
}) => {
  return (
    <>
      <div className="h-[60px] px-[10px] flex items-center justify-center">
        <CustomButton
          title={title}
          onClick={onClick}
          bgColor={bgColor}
          textColor={textColor}
        />
      </div>
      <CustomDivider orientation="horizontal" />
    </>
  );
};

export default CustomHomeButton;

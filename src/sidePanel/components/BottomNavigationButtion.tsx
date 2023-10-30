import React from "react";
import { Pages, buttonsData } from "../../utils/enums/pages.enum";
import CustomButton from "./CustomButton";

interface BottomNavigationButtonProps {
  page: Pages;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
}

const BottomNavigationButton: React.FC<BottomNavigationButtonProps> = ({
  page,
  setPage,
}) => {
  return (
    <div className="h-[60px] px-[10px] flex items-center justify-center">
      <CustomButton
        title={buttonsData[page as keyof typeof buttonsData].title}
        bgColor="#FBBB00"
        textColor="white"
        onClick={() => {
          setPage(buttonsData[page].navigateTo);
        }}
      />
    </div>
  );
};

export default BottomNavigationButton;

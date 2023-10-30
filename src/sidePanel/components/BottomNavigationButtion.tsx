import React from "react";
import CustomButton from "./CustomButton";

interface BottomNavigationButtonProps {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}

const BottomNavigationButton: React.FC<BottomNavigationButtonProps> = ({
  page,
  setPage,
}) => {
  const buttonsData: any = {
    listbuilder: {
      title: "Continue to Product Type",
      navigateTo: "productsType",
    },
    productsType: {
      title: "Continue to Analysis",
      navigateTo: "productsAnalysis",
    },
    productsAnalysis: {
      title: "Accept and Create Order",
      navigateTo: "",
    },
  };

  return (
    <div className="h-[60px] px-[10px] flex items-center justify-center">
      <CustomButton
        title={buttonsData[page].title}
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

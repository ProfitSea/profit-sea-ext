import React from "react";
import CustomButton from "../CustomButton";

const SavingsCard = () => {
  return (
    <>
      <div className="mx-3 my-2 rounded-md border-2 border-[#F5F5F5]">
        <div className="px-4 py-6 flex justify-between items-center">
          <p className="text-2xl font-bold">$204.34</p>
          <p className="text-sm font-medium">Saved on this order</p>
        </div>
        <div className="p-4 bg-[#F5F5F5]">
          <div className="mb-4 bg-[#F5F5F5]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <img
                  src="/assets/icons/info.svg"
                  className="w-[15px]"
                  alt="anchor"
                />
                <p>US Foods only order</p>
              </div>
              <p className="text-green-500">+$154.42</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <img
                  src="/assets/icons/info.svg"
                  className="w-[15px]"
                  alt="anchor"
                />
                <p>Sysco Only order</p>
              </div>
              <p className="text-green-500">+$178.62</p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[60px] px-[12px] flex items-center justify-center">
        <CustomButton
          title={"Generate Order"}
          bgColor="#FBBB00"
          textColor="white"
          onClick={() => {}}
        />
      </div>
    </>
  );
};

export default SavingsCard;

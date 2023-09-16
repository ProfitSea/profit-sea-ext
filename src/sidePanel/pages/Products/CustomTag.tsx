import React from "react";

interface CustomTagProps {
  active: boolean;
  name: string;
  count: number;
  icon: React.ReactElement;
}

const CustomTag: React.FC<CustomTagProps> = ({ active, name, count, icon }) => {
  return (
    <div
      className={`h-9 px-2 py-1.5 ${
        active ? "bg-[#FBBB00] text-white" : "bg-[#EBEBEB] text-[#737373]"
      } rounded-2xl justify-start items-center gap-2 inline-flex`}
    >
      <div className="justify-start items-center gap-2 flex">
        <div className="w-4 h-4 text-xs relative">{icon}</div>
        <div className="w-[70px] text-xs font-normal font-['SF Pro Text'] leading-tight">
          {name}
        </div>
      </div>
      <div className="justify-center text-white items-center flex rounded-full bg-[#737373]">
        <div className="self-stretch p-[5px] flex-col justify-start items-center inline-flex">
          <div className="w-3.5 h-3.5 text-[12px] relative">{count}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomTag;

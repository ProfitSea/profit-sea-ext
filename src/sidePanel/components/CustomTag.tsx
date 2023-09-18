import React from "react";
import DiscountSvgIcon from "./svg-icons/DiscountSvgIcon";
import AnchorSvgIcon from "./svg-icons/AnchorSvgIcon";

interface CustomTagProps {
  id: number;
  active: boolean;
  name: string;
  count: number;
  icon: string;
  onActive: (id: number) => void;
}

const CustomTag: React.FC<CustomTagProps> = ({
  id,
  active,
  name,
  count,
  icon,
  onActive,
}) => {
  const renderIcon = () => {
    switch (icon) {
      case "anchor":
        return (
          <AnchorSvgIcon
            customColor={active ? "white" : "#737373"}
            style={{
              fontSize: "1rem",
              verticalAlign: "inherit",
            }}
          />
        );
      case "discount":
        return (
          <DiscountSvgIcon
            customColor={active ? "white" : "#737373"}
            style={{
              fontSize: "1rem",
              verticalAlign: "inherit",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      key={id}
      onClick={() => onActive(id)}
      className={`h-9 px-2 py-1.5 ${
        active ? "bg-[#FBBB00] text-white" : "bg-[#EBEBEB] text-[#737373]"
      } rounded-2xl justify-start items-center gap-2 inline-flex cursor-pointer`}
    >
      <div className="justify-start items-center gap-2 flex">
        <div className="w-4 h-4 text-xs relative">{renderIcon()}</div>
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

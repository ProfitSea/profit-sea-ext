import React from "react";

interface SocialButtonProps {
  icon: string;
  onClick: () => void;
}

const SocialButton = ({ icon, onClick }: SocialButtonProps) => {
  return (
    <div
      onClick={onClick}
      className="w-[80px] h-[50px] py-3.5 rounded-lg border border-zinc-300 justify-center items-center inline-flex cursor-pointer"
    >
      <div className="w-6 h-6 relative flex-col justify-start items-start flex">
        <img src={`/assets/icons/${icon}.png`} alt={icon} />
      </div>
    </div>
  );
};

export default SocialButton;

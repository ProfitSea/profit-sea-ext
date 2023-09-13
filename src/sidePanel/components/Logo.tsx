import React from "react";

interface LogoProps {
  name?: boolean;
}

const Logo: React.FC<LogoProps> = ({ name = true }) => {
  return (
    <React.Fragment>
      <img src="/icon.png" alt="logo" style={{ width: "40%" }} />
      {name && <p className="text-white text-[30px] mt-[-5px] font-extrabold">ProfitSea</p>}
      {name && <p className="text-white text-[15px] mt-[-10px]">Pirate Your Prices</p>}
    </React.Fragment>
  );
};

export default React.memo(Logo);

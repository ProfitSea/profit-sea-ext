import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import * as React from "react";

interface DiscountSvgIconProps extends Omit<SvgIconProps, "color"> {
  customColor?: string;
}
const DiscountSvgIcon: React.FC<DiscountSvgIconProps> = ({
  customColor,
  ...props
}) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill='none'
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.36507 2.30273L15.7472 2.30273C15.9957 2.30273 16.1972 2.50421 16.1972 2.75273L16.1972 9.13485C16.1972 9.37355 16.1024 9.60246 15.9336 9.77125L9.62867 16.0762C9.2772 16.4276 8.70735 16.4276 8.35588 16.0762L2.42376 10.144C2.07229 9.79257 2.07229 9.22272 2.42376 8.87125L8.72867 2.56634C8.89745 2.39756 9.12637 2.30273 9.36507 2.30273Z"
          stroke={customColor}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5996 6.80028C12.5996 7.29734 12.1967 7.70028 11.6996 7.70028C11.2026 7.70028 10.7996 7.29734 10.7996 6.80028C10.7996 6.30322 11.2026 5.90028 11.6996 5.90028C12.1967 5.90028 12.5996 6.30322 12.5996 6.80028Z"
          stroke={customColor}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.7024 6.79707H11.6964V6.80349H11.7024V6.79707Z"
          stroke={customColor}
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SvgIcon>
  );
};

export default DiscountSvgIcon;

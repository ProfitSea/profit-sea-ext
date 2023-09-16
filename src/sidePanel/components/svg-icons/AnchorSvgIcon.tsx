import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import * as React from "react";

interface AnchorSvgIconProps extends Omit<SvgIconProps, "color"> {
  customColor?: string;
}
const AnchorSvgIcon: React.FC<AnchorSvgIconProps> = ({
  customColor,
  ...props
}) => {
  return (
    <SvgIcon {...props}>
      <svg viewBox="0 0 18 19" xmlns="http://www.w3.org/2000/svg">
        <path
          fill={customColor
        }
          d="M13.5713 11.8142L14.7891 13.0099C14.0349 14.3136 12.1727 15.3551 10.4284 15.6096V8.7285H12.7856V7.18564H10.4284V6.27536C11.3399 5.95136 11.9999 5.10279 11.9999 4.09993C11.9999 2.82707 10.9391 1.78564 9.64272 1.78564C8.34629 1.78564 7.28557 2.82707 7.28557 4.09993C7.28557 5.10279 7.94557 5.95136 8.857 6.27536V7.18564H6.49986V8.7285H8.857V15.6096C7.11272 15.3551 5.25057 14.3136 4.49629 13.0099L5.71415 11.8142L2.57129 9.49993V11.8142C2.57129 14.8074 6.437 17.2142 9.64272 17.2142C12.8484 17.2142 16.7141 14.8074 16.7141 11.8142V9.49993L13.5713 11.8142ZM9.64272 3.3285C10.0749 3.3285 10.4284 3.67564 10.4284 4.09993C10.4284 4.52422 10.0749 4.87136 9.64272 4.87136C9.21057 4.87136 8.857 4.52422 8.857 4.09993C8.857 3.67564 9.21057 3.3285 9.64272 3.3285Z"
        />
      </svg>
    </SvgIcon>
  );
};

export default AnchorSvgIcon;

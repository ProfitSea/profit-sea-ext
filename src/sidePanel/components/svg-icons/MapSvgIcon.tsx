import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import * as React from "react";

interface MapSvgIconProps extends Omit<SvgIconProps, "color"> {
  customColor?: string;
}
const MapSvgIcon: React.FC<MapSvgIconProps> = ({ customColor, ...props }) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="18"
        height="19"
        viewBox="0 0 18 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g clipPath="url(#clip0_165_2478)">
          <rect
            y="0.5"
            width="18"
            height="18"
            fill="url(#pattern0)"
            fillOpacity="0.5"
          />
        </g>
        <defs>
          <pattern
            id="pattern0"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use xmlnsXlink="#image0_165_2478" transform="scale(0.0104167)" />
          </pattern>
          <clipPath id="clip0_165_2478">
            <rect
              width="18"
              height="18"
              fill={customColor}
              transform="translate(0 0.5)"
            />
          </clipPath>
          <image
            id="image0_165_2478"
            width="96"
            height="96"
            xmlnsXlink="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAADjUlEQVR4nO2dO2sVQRTHf/gob5bcwkKI+CB+EmshhLQW5gNYWtv5UcRHFAxY2ApucdMHK7kJFj6CmMoYGRmY2yxZ787deZzdOT/4N2HCPXv+s7N7hplZUBRFURRFURRFURRFKZYNYJo7iNK4DNwH9oFz4Ax4BzwUasYi3jfAqdMr4C4D4wbwBDgGTIskmbGxJN4TYJOB9XbjoRxm+Mb7EqFcBx4Dnz2Tblpkk/EBeARcExSvvQvEcAm4BzwH/gRKvIloRqh4R9fbTWQzQsc76t5uApkRM15RbwZSdOYe4LsJ4k2Cfd3aW+FNpgRFxxYc3wVcqBGq6LzwCKZ2itXeCFR0fnQMZAasAxXwMUJ7I1TR8Un+gmVJnXm2l6zsBjSTuSypM8/20hWdVZLfltSZZ/shKDqrJr+Z1Jln+9yJFW9A7ZLVhcqzbd0zKXNgG5g4bQGHYzPA14SUyb9o+tr+7WhsBoQ0oQpUE9ie38bOGA0IYUIVsCCzQ04ba2M1oI8JVeBqeLLkt0ZrwComVBGmIuwDtw07PKkBkQ04/M9D+NOYDZAyBBn3trPjxvw11/NjJF+MAZIewiZx3RCd2MnPbULfuiE6KZKf04S+dUN0hjgVYRLWDeINWCS09mwvwYAudYPoIaiZzNqzfQr1rRuisyyAtqS2JbP2bB9bfeuG6HS5iGZSlyWz9mwfW33qBhEGWB24XtM1mQee7aVKjAGLnq3LUgKTu4cZ4YpO7gs0wqUGUPhc0NA1H/Jc0Bi0PdS5oLFoMtS5IKnrdExJc0ES1+mY0uaCpK3TMSXOBUlap2NKnQuSsk7HJJZ4A1Kv0zFqQN51OkYNyLtOx6gB+euGeSn7A2Jo3rNuKG5/QGht96wbitwfEFKTnnVDsfsDUhhQJfj/4g3Y6lk3FL0/wAioGw5L3R8QUkc964bi9geUrOjkvkAjXGoAakD2Xmj0DihT33QIIqsBz9QAsiX/K3BHDSB54s/d8fW3UyQ/5mvosTtUddcdsnqWeTjpGq89vDYpIS/iL/DeValXG79jT9N6ALwFfgtIeDPeK2QixIV8AZ4Ctzr+Zm4zFvHeRAAxersPqcwQ0dsv4qeg3rMewQzfuzM5ex3fDPbd5z/sZ0BSMHWfN1nlAZ4j3l4np59IezNY0YxFvPaDQoNi0x3i/csVIK8F955pw4xB9faxMRVwdyqKoiiKoiiKoiiKopCJfw5GjGgu4k+sAAAAAElFTkSuQmCC"
          />
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default MapSvgIcon;

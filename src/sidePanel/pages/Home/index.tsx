import React from "react";
import CustomHomeButton from "./CustomHomeButton";

const Home = () => {
  return (
    <div className="flex-grow flex flex-col">
      <CustomHomeButton
        title="Open All Vendors"
        bgColor="#FBBB00"
        textColor="white"
        onClick={() => {}}
      />
      <CustomHomeButton
        title="Open US Foods"
        bgColor="#4A4A4A"
        textColor="white"
        onClick={() => {
          chrome.tabs.create({
            url: "https://order.usfoods.com/desktop/lists",
          });
        }}
      />
      <CustomHomeButton
        title="Open Sysco"
        bgColor="#4A4A4A"
        textColor="white"
        onClick={() => {
          chrome.tabs.create({
            url: "https://shop.sysco.com/app/lists",
          });
        }}
      />
      <CustomHomeButton
        title="Open Performance Food Group"
        bgColor="#4A4A4A"
        textColor="white"
        onClick={() => {}}
      />
      <CustomHomeButton
        title="Open Gordon Foods"
        bgColor="#4A4A4A"
        textColor="white"
        onClick={() => {}}
      />
    </div>
  );
};

export default Home;

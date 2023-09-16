import React from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import CustomButton from "../../components/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import Header from "../../components/Header";
import AnchorSvgIcon from "../../components/svg-icons/AnchorSvgIcon";
import DiscountSvgIcon from "../../components/svg-icons/DiscountSvgIcon";
import CustomTag from "./CustomTag";

const Product = () => {
  return (
    <div className="w-80 h-[200px] px-3.5 bg-white flex-col justify-start items-start gap-3.5 inline-flex">
      <div className="self-stretch h-[158px] py-[17px] bg-white flex-col justify-start items-start gap-3.5 flex">
        <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
          <div className="w-16 h-16 rounded-lg justify-center items-center flex">
            <div className="grow shrink basis-0 self-stretch p-px bg-white rounded-[5px] justify-center items-center inline-flex">
              <img
                className="w-[62px] h-[62px]"
                src="https://via.placeholder.com/62x62"
              />
            </div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
            <div className="self-stretch text-zinc-800 text-[13px] font-semibold font-['SF Pro Text'] leading-tight">
              US FOODS
              <br />
              Packer
              <br />
              Potato, French-fry 1/2" Crinkle-cut Frozen
            </div>
            <div className="self-stretch text-neutral-500 text-xs font-normal font-['SF Pro Text'] leading-[18px]">
              #3351426 | 6/5 LB | $0.96 / LB
            </div>
          </div>
          <div className="justify-center items-end gap-2.5 flex">
            <div className="h-[79px] flex-col justify-start items-center inline-flex">
              <div className="w-[87px] h-[47px] text-center text-zinc-800 text-sm font-semibold font-['SF Pro Text'] leading-[21px]">
                $28.99 CS
              </div>
              <div className="w-[90px] h-[23px] relative">
                <div className="w-[21px] h-[21px] left-0 top-[1px] absolute bg-stone-800 rounded-xl justify-center items-center gap-2.5 inline-flex">
                  <div className="text-white text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
                    +
                  </div>
                </div>
                <div className="w-[26px] h-[23px] left-[33px] top-0 absolute rounded-[5px] border border-slate-200" />
                <div className="w-5 left-[36px] top-[2.50px] absolute text-center text-black text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
                  10
                </div>
                <div className="w-[21px] h-[21px] left-[69px] top-[1px] absolute bg-stone-800 rounded-xl justify-center items-center gap-2.5 inline-flex">
                  <div className="text-white text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
                    -
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  return (
    <div className="">
      <Header />
      <CustomDivider orientation="horizontal" />
      <div className="h-[40px] flex items-center justify-start px-[8px] gap-[12px]">
        <p className="text-lg">Main Order Guide (72 Items)</p>
        <img src="/assets/icons/pen.png" className="w-[18px]" alt="edit" />
      </div>
      <CustomDivider orientation="horizontal" />
      <BreadCrumbs />
      <CustomDivider orientation="horizontal" />
      <div className="h-[100px] bg-[#F5F5F5] flex flex-col items-start justify-center px-[8px] gap-[12px] overflow-x-auto">
        <div className="flex flex-row gap-[12px]">
          <CustomTag
            name="All Vendors"
            active={true}
            count={72}
            icon={
              <DiscountSvgIcon
                customColor={true ? "white" : "#737373"}
                style={{
                  fontSize: "1rem",
                  verticalAlign: "inherit",
                }}
              />
            }
          />
          <CustomTag
            name="US Foods"
            active={false}
            count={46}
            icon={
              <DiscountSvgIcon
                customColor={false ? "white" : "#737373"}
                style={{
                  fontSize: "1rem",
                  verticalAlign: "inherit",
                }}
              />
            }
          />
          <CustomTag
            name="Sysco"
            active={false}
            count={26}
            icon={
              <DiscountSvgIcon
                customColor={false ? "white" : "#737373"}
                style={{
                  fontSize: "1rem",
                  verticalAlign: "inherit",
                }}
              />
            }
          />
        </div>
        <div className="flex flex-row gap-[12px]">
          <CustomTag
            name="All Products"
            active={true}
            count={72}
            icon={
              <AnchorSvgIcon
                customColor={true ? "white" : "#737373"}
                style={{
                  fontSize: "1rem",
                  verticalAlign: "inherit",
                }}
              />
            }
          />
          <CustomTag
            name="Anchors"
            active={false}
            count={46}
            icon={
              <AnchorSvgIcon
                customColor={false ? "white" : "#737373"}
                style={{
                  fontSize: "1rem",
                  verticalAlign: "inherit",
                }}
              />
            }
          />
          <CustomTag
            name="Hooks"
            active={false}
            count={26}
            icon={<img src="/assets/icons/map.svg" alt="map" />}
          />
        </div>
      </div>
      <CustomDivider orientation="horizontal" />
      <div className="h-[380px] bg-[#F5F5F5] flex flex-col overflow-y-auto">
        <Product />
        <CustomDivider orientation="horizontal" />
        <Product />
        <CustomDivider orientation="horizontal" />
        <Product />
        <CustomDivider orientation="horizontal" />
        <Product />
      </div>
      <CustomDivider orientation="horizontal" />
      <div className="h-[60px] px-[10px] flex items-center justify-center">
        <CustomButton
          title="Continue to Product Type"
          bgColor="#FBBB00"
          textColor="white"
          onClick={() => {}}
        />
      </div>
      <div className="text-[#FBBB00] px-[12px] flex flex-row gap-[20px]">
        <p className="">How it works</p>
        <p>Privacy Policy</p>
      </div>
    </div>
  );
};

export default Products;

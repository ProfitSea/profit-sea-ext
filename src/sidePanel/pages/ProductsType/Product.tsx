import React from "react";

const Product = () => {

  return (
    <div className="w-[100%] h-[170px] px-3.5 bg-white border-t border-neutral-200 flex-col justify-start items-start gap-3.5 inline-flex">
      <div className="self-stretch h-[158px] py-[17px] bg-white border-t border-neutral-200 flex-col justify-start items-start gap-3.5 flex">
        <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
          <div className="w-16 h-16 rounded-lg justify-center items-center flex">
            <div className="grow shrink basis-0 self-stretch p-px bg-white rounded-[5px] border border-neutral-200 justify-center items-center inline-flex">
              <img
                className="w-[62px] h-[62px]"
                src="https://via.placeholder.com/62x62"
              />
            </div>
          </div>
          <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
            <div className="self-stretch text-zinc-800 text-[13px] font-semibold font-['SF Pro Text'] leading-[1.4]">
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
          <div className="w-[35px] h-[35px] relative">
            <img
              src="/assets/icons/map.png"
              className="w-[35px] h-[35px] left-0 top-0 absolute rounded-full"
              alt="map"
            />
          </div>
          <div className="w-[35px] h-[35px] relative">
            <img
              src="/assets/icons/anchor.png"
              className="w-[35px] h-[35px] left-0 top-0 absolute rounded-full"
              alt="map"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

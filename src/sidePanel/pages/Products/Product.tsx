import React from "react";

const Product = () => {
  const [quantity, setQuantity] = React.useState(10);

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
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-[21px] h-[21px] left-0 top-[1px] absolute bg-stone-800 rounded-xl justify-center items-center gap-2.5 inline-flex"
                >
                  <div className="text-white text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
                    +
                  </div>
                </button>
                <div className="w-[26px] h-[23px] left-[33px] top-0 absolute rounded-[5px] border border-slate-200" />
                <div className="w-5 left-[36px] top-[2.50px] absolute text-center text-black text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity((prev) => prev - 1)}
                  className="w-[21px] h-[21px] left-[69px] top-[1px] absolute bg-stone-800 rounded-xl justify-center items-center gap-2.5 inline-flex"
                >
                  <div className="text-white text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
                    -
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

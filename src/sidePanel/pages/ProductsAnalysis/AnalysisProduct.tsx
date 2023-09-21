import { DeleteOutlined } from "@mui/icons-material";
import React from "react";

const AnalysisProduct = () => {
  const [quantity, setQuantity] = React.useState(0);
  const [isSelected, setIsSelected] = React.useState(false);

  if (isSelected) {
    return (
      <div className="w-[100%] pl-3.5 pr-[17px] pt-[35px] pb-[19px] bg-white border-t border-neutral-200 flex-col justify-end items-start inline-flex">
        <div className="w-[100%] rounded-t-lg bg-yellow-500 h-5 px-[12px] justify-start items-center inline-flex">
          <span className="text-black text-[10px] font-bold font-['SF Pro Text'] leading-[15px]">
            $30.10 Savings.
          </span>
          <span className="text-black text-[10px] font-normal font-['SF Pro Text'] leading-[15px]">
            {" "}
            Better price for slightly more quantity.
          </span>
        </div>
        <div className="w-[100%] rounded-b-lg px-3.5 py-3.5 bg-white border-2 border-yellow-500 flex flex-col justify-start items-start gap-2">
          <div className="self-stretch py-[10px] flex-col justify-start items-start gap-3.5 flex">
            <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
              <div className="rounded-lg justify-center items-center flex">
                <div className="grow shrink basis-0 self-stretch p-px rounded-[5px] justify-center items-center inline-flex">
                  <img
                    className="w-[62px] h-[62px]"
                    src="https://via.placeholder.com/62x62"
                  />
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
                <div className="self-stretch text-zinc-800 text-[13px] font-semibold leading-tight">
                  US FOODS
                  <br />
                  Packer
                  <br />
                  Potato, French-fry 1/2" Crinkle-cut Frozen
                </div>
                <div className="self-stretch text-neutral-500 text-xs font-normal leading-[18px]">
                  #3351426 | 6/5 LB | $0.96 / LB
                </div>
              </div>
              <div className="justify-center items-end gap-2.5 flex">
                <div className="h-[79px] flex-col justify-start items-center inline-flex">
                  <div className="w-[87px] h-[47px] text-center text-zinc-800 text-sm font-semibold leading-[21px]">
                    $28.99 CS
                  </div>
                  <div className="w-[90px] h-[23px] relative">
                    <button
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="w-[21px] h-[21px] left-0 top-[1px] absolute bg-white rounded-xl justify-center items-center gap-2.5 inline-flex"
                    >
                      <div className="text-stone-800 text-xs font-semibold leading-[18px]">
                        +
                      </div>
                    </button>
                    <div className="w-[26px] h-[23px] left-[33px] top-0 absolute rounded-[5px] border border-slate-200" />
                    <div className="w-5 left-[36px] top-[2.50px] absolute text-center text-black text-xs font-semibold leading-[18px]">
                      {quantity}
                    </div>
                    {quantity !== 0 ? (
                      <button
                        onClick={() => setQuantity((prev) => prev - 1)}
                        className="w-[21px] h-[21px] left-[69px] top-[1px] absolute bg-white rounded-xl justify-center items-center gap-2.5 inline-flex"
                      >
                        <div className="text-stone-800 text-xs font-semibold leading-[18px]">
                          -
                        </div>
                      </button>
                    ) : (
                      <button
                        onClick={() => {}}
                        className="w-[21px] h-[21px] left-[69px] top-[1px] absolute justify-center items-center gap-2.5 inline-flex"
                      >
                        <div className="text-white text-xs font-semibold leading-[18px]">
                          <DeleteOutlined />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center gap-3.5">
            <button
              onClick={() => {}}
              className="text-black bg-yellow-500 text-sm font-medium leading-[15px] w-[123.70px] h-[50.71px] rounded-[5px]"
            >
              Added
            </button>
            <button
              onClick={() => setIsSelected(false)}
              className="w-[123.70px] h-[50.71px] bg-white border-yellow-500 rounded-[5px] border-2 text-yellow-500 text-sm font-medium leading-[15px]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      <div className="w-[100%] rounded-t-lg px-3.5 bg-[#CE0E006B] flex-col justify-start items-start gap-3.5 inline-flex">
        <div className="self-stretch py-[17px] flex-col justify-start items-start gap-3.5 flex">
          <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
            <div className="rounded-lg justify-center items-center flex">
              <div className="grow shrink basis-0 self-stretch p-px bg-white rounded-[5px] justify-center items-center inline-flex">
                <img
                  className="w-[62px] h-[62px]"
                  src="https://via.placeholder.com/62x62"
                />
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
              <div className="self-stretch text-zinc-800 text-[13px] font-semibold leading-tight">
                US FOODS
                <br />
                Packer
                <br />
                Potato, French-fry 1/2" Crinkle-cut Frozen
              </div>
              <div className="self-stretch text-neutral-500 text-xs font-normal leading-[18px]">
                #3351426 | 6/5 LB | $0.96 / LB
              </div>
            </div>
            <div className="justify-center items-end gap-2.5 flex">
              <div className="h-[79px] flex-col justify-start items-center inline-flex">
                <div className="w-[87px] h-[47px] text-center text-zinc-800 text-sm font-semibold leading-[21px]">
                  $28.99 CS
                </div>
                <div className="w-[90px] h-[23px] relative">
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-[21px] h-[21px] left-0 top-[1px] absolute bg-white rounded-xl justify-center items-center gap-2.5 inline-flex"
                  >
                    <div className="text-stone-800 text-xs font-semibold leading-[18px]">
                      +
                    </div>
                  </button>
                  <div className="w-[26px] h-[23px] left-[33px] top-0 absolute rounded-[5px] border border-slate-200" />
                  <div className="w-5 left-[36px] top-[2.50px] absolute text-center text-black text-xs font-semibold leading-[18px]">
                    {quantity}
                  </div>
                  {quantity !== 0 ? (
                    <button
                      onClick={() => setQuantity((prev) => prev - 1)}
                      className="w-[21px] h-[21px] left-[69px] top-[1px] absolute bg-white rounded-xl justify-center items-center gap-2.5 inline-flex"
                    >
                      <div className="text-stone-800 text-xs font-semibold leading-[18px]">
                        -
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() => {}}
                      className="w-[21px] h-[21px] left-[69px] top-[1px] absolute justify-center items-center gap-2.5 inline-flex"
                    >
                      <div className="text-white text-xs font-semibold leading-[18px]">
                        <DeleteOutlined />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] rounded-b-lg px-3.5 py-3.5 bg-[#65B500C4] flex flex-col justify-start items-start gap-2">
        <div className="self-stretch py-[10px] flex-col justify-start items-start gap-3.5 flex">
          <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
            <div className="rounded-lg justify-center items-center flex">
              <div className="grow shrink basis-0 self-stretch p-px rounded-[5px] justify-center items-center inline-flex">
                <img
                  className="w-[62px] h-[62px]"
                  src="https://via.placeholder.com/62x62"
                />
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
              <div className="self-stretch text-zinc-800 text-[13px] font-semibold leading-tight">
                US FOODS
                <br />
                Packer
                <br />
                Potato, French-fry 1/2" Crinkle-cut Frozen
              </div>
              <div className="self-stretch text-neutral-500 text-xs font-normal leading-[18px]">
                #3351426 | 6/5 LB | $0.96 / LB
              </div>
            </div>
            <div className="justify-center items-end gap-2.5 flex">
              <div className="h-[79px] flex-col justify-start items-center inline-flex">
                <div className="w-[87px] h-[47px] text-center text-zinc-800 text-sm font-semibold leading-[21px]">
                  $28.99 CS
                </div>
                <div className="w-[90px] h-[23px] relative">
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-[21px] h-[21px] left-0 top-[1px] absolute bg-white rounded-xl justify-center items-center gap-2.5 inline-flex"
                  >
                    <div className="text-stone-800 text-xs font-semibold leading-[18px]">
                      +
                    </div>
                  </button>
                  <div className="w-[26px] h-[23px] left-[33px] top-0 absolute rounded-[5px] border border-slate-200" />
                  <div className="w-5 left-[36px] top-[2.50px] absolute text-center text-black text-xs font-semibold leading-[18px]">
                    {quantity}
                  </div>
                  {quantity !== 0 ? (
                    <button
                      onClick={() => setQuantity((prev) => prev - 1)}
                      className="w-[21px] h-[21px] left-[69px] top-[1px] absolute bg-white rounded-xl justify-center items-center gap-2.5 inline-flex"
                    >
                      <div className="text-stone-800 text-xs font-semibold leading-[18px]">
                        -
                      </div>
                    </button>
                  ) : (
                    <button
                      onClick={() => {}}
                      className="w-[21px] h-[21px] left-[69px] top-[1px] absolute justify-center items-center gap-2.5 inline-flex"
                    >
                      <div className="text-white text-xs font-semibold leading-[18px]">
                        <DeleteOutlined />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[38px]">
          <span className="text-neutral-500 text-xs font-normal leading-[18px]">
            Recommendation details:{" "}
          </span>
          <span className="text-black text-xs font-normal leading-[18px]">
            Savings of $16.91. Better price & quantity{" "}
          </span>
        </div>
        <div className="flex justify-center items-center gap-3.5">
          <button
            onClick={() => setIsSelected(true)}
            className="text-white text-sm font-medium leading-[15px] w-[123.70px] h-[50.71px] bg-lime-700 rounded-[5px]"
          >
            Add
          </button>
          <button className="w-[123.70px] h-[50.71px] bg-slate-200 rounded-[5px] text-stone-800 text-sm font-medium leading-[15px]">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisProduct;

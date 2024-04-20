import React from "react";
import {
  ListItemInterface,
  SaleUnitQuantityInterface,
} from "../../../utils/types/product-response.type";
import SaleUnitQuantity from "../../components/ProductAnalysis/SaleUnitQuantity";

interface PurchaseProductProps {
  listItem: ListItemInterface;
}

const PurchaseProduct: React.FC<PurchaseProductProps> = ({ listItem }) => {
  const [isSelected, setIsSelected] = React.useState(false);

  const recommendedListItem =
    listItem.recommendation?.listItemId === listItem.id
      ? listItem
      : listItem.comparisonProducts[0];
  const rejectedListItem =
    listItem.recommendation?.listItemId === listItem.id
      ? listItem.comparisonProducts[0]
      : listItem;

  if (isSelected) {
    return (
      <div className="w-[100%] pl-3.5 pr-[17px] pt-[35px] pb-[19px] bg-white border-t border-neutral-200 flex-col justify-end items-start inline-flex">
        <div className="w-[100%] rounded-t-lg bg-yellow-500 py-[10px] gap-[5px] px-[12px] justify-start items-center inline-flex">
          <span className="text-black text-[10px] font-bold font-['SF Pro Text'] leading-[15px] w-[100px]">
            {`${listItem.recommendation?.priceSaving}`} Savings.
          </span>
          <span className="text-black text-[10px] font-normal font-['SF Pro Text'] leading-[15px]">
            {`${listItem.recommendation?.reason}`}
          </span>
        </div>
        <div className="w-[100%] rounded-b-lg px-3.5 py-3.5 bg-white border-2 border-yellow-500 flex flex-col justify-start items-start gap-2">
          <div className="self-stretch py-[10px] flex-col justify-start items-start gap-3.5 flex">
            <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
              <div className="rounded-lg justify-center items-center flex">
                <div className="grow shrink basis-0 self-stretch p-px rounded-[5px] justify-center items-center inline-flex">
                  <img
                    className="w-[62px] h-[62px]"
                    src={recommendedListItem.product.imgSrc}
                  />
                </div>
              </div>
              <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
                <div className="self-stretch text-zinc-800 text-[13px] font-semibold leading-tight">
                  {recommendedListItem.product.vendor.name}
                  <br />
                  {recommendedListItem.product.brand}
                  <br />
                  {recommendedListItem.product.description}
                </div>
                <div className="self-stretch text-neutral-500 text-xs font-normal leading-[18px]">
                  {`${recommendedListItem.product.productNumber} | ${recommendedListItem.product.packSize}`}
                </div>
              </div>
              <div className="justify-center items-center gap-2.5 flex">
                <div className="max-h-[200px] flex-col justify-start items-center flex gap-3">
                  {recommendedListItem.saleUnitQuantities.map(
                    (saleUnitQuantity: SaleUnitQuantityInterface) => (
                      <div key={saleUnitQuantity._id}>
                        <SaleUnitQuantity
                          saleUnitQuantity={saleUnitQuantity}
                          listItemId={listItem.id}
                        />
                      </div>
                    )
                  )}
                  <div className="justify-center items-center flex-row gap-[5px] flex">
                    <div className="text-[#1C1C1C] text-[14px] font-bold">
                      {`${recommendedListItem.totalPrice}`}
                    </div>
                    <div className="text-[#1C1C1C] text-[14px] font-bold">
                      Total
                    </div>
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
                  src={rejectedListItem.product.imgSrc}
                />
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
              <div className="self-stretch text-zinc-800 text-[13px] font-semibold leading-tight">
                {rejectedListItem.product.vendor.name}
                <br />
                {rejectedListItem.product.brand}
                <br />
                {rejectedListItem.product.description}
              </div>
              <div className="self-stretch text-neutral-500 text-xs font-normal leading-[18px]">
                {`${rejectedListItem.product.productNumber} | ${rejectedListItem.product.packSize}`}
              </div>
            </div>
            <div className="justify-center items-center gap-2.5 flex">
              <div className="max-h-[200px] flex-col justify-start items-center flex gap-3">
                {rejectedListItem.saleUnitQuantities.map(
                  (saleUnitQuantity: SaleUnitQuantityInterface) => (
                    <div key={saleUnitQuantity._id}>
                      <SaleUnitQuantity
                        saleUnitQuantity={saleUnitQuantity}
                        listItemId={listItem.id}
                      />
                    </div>
                  )
                )}
                <div className="justify-center items-center flex-row gap-[5px] flex">
                  <div className="text-[#1C1C1C] text-[14px] font-bold">
                    {`${rejectedListItem.totalPrice}`}
                  </div>
                  <div className="text-[#1C1C1C] text-[14px] font-bold">
                    Total
                  </div>
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
                  src={recommendedListItem.product.imgSrc}
                />
              </div>
            </div>
            <div className="grow shrink basis-0 flex-col justify-center items-start inline-flex">
              <div className="self-stretch text-zinc-800 text-[13px] font-semibold leading-tight">
                {`${recommendedListItem.product.vendor.name}`}
                <br />
                {`${recommendedListItem.product.brand}`}
                <br />
                {`${recommendedListItem.product.description}`}
              </div>
              <div className="self-stretch text-neutral-500 text-xs font-normal leading-[18px]">
                {`${recommendedListItem.product.productNumber} | ${recommendedListItem.product.packSize}`}
              </div>
            </div>
            <div className="justify-center items-center gap-2.5 flex">
              <div className="max-h-[200px] flex-col justify-start items-center flex gap-3">
                {recommendedListItem.saleUnitQuantities.map(
                  (saleUnitQuantity: SaleUnitQuantityInterface) => (
                    <div key={saleUnitQuantity._id}>
                      <SaleUnitQuantity
                        saleUnitQuantity={saleUnitQuantity}
                        listItemId={listItem.id}
                      />
                    </div>
                  )
                )}
                <div className="justify-center items-center flex-row gap-[5px] flex">
                  <div className="text-[#1C1C1C] text-[14px] font-bold">
                    {`${recommendedListItem.totalPrice}`}
                  </div>
                  <div className="text-[#1C1C1C] text-[14px] font-bold">
                    Total
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[100%] py-3">
          <span className="text-neutral-800 text-xs font-bold leading-[18px]">
            Price Savings:{" "}
          </span>
          <span className="text-black text-xs font-normal leading-[18px]">
            {`${listItem.recommendation?.priceSaving}`}
          </span>
          <br />
          <span className="text-neutral-800 text-xs font-bold leading-[18px]">
            Recommendation details:{" "}
          </span>
          <span className="text-black text-xs font-normal leading-[18px]">
            {`${listItem.recommendation?.reason}`}
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

export default PurchaseProduct;

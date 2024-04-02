import React from "react";
import { ListItemInterface } from "../../../utils/types/product-response.type";

interface ProductListItemProps {
  item: ListItemInterface;
}

const ProductListItem: React.FC<ProductListItemProps> = React.memo(({ item }) => {
  return (
    <div
      key={item.id}
      className={`${
        item.isAnchored ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      } ml-[-11px] self-stretch justify-start items-center gap-3.5 my-2 inline-flex`}
    >
      <div className="w-12 h-12 bg-white rounded-md flex justify-center items-center border-[1px] border-zinc-300 ">
        <img
          className="w-[40px] h-[40px] p-[2px] rounded-md max-w-none"
          src={item.product.imgSrc}
        />
      </div>
      <div className="w-[150px] grow shrink basis-0 flex-col justify-center items-start inline-flex">
        <div
          title={item.product.vendor.name}
          className="self-stretch text-zinc-800 text-[12px] font-semibold font-['SF Pro Text'] leading-[1.4] text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {item.product.vendor.name}
        </div>
        <div
          title={item.product.description}
          className="self-stretch text-zinc-800 text-[12px] font-semibold font-['SF Pro Text'] leading-[1.4] text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {item.product.description}
        </div>
        <div
          title={`${item.product.productNumber} | ${item.product.packSize}`}
          className="self-stretch text-neutral-500 text-[12px] font-light font-['SF Pro Text'] leading-[18px]"
        >
          {`${item.product.productNumber} | ${item.product.packSize}`}
        </div>
      </div>
    </div>
  );
});

export default ProductListItem;

import React from "react";

interface ProductDescriptionProps {
  vendor: string;
  brand: string;
  description: string;
  productNumber: string;
  packSize: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  vendor,
  brand,
  description,
  productNumber,
  packSize,
}) => {
  return (
    <div className="w-[200px] grow shrink basis-0 flex-col justify-center items-start inline-flex">
      <div className="self-stretch text-zinc-800 text-[13px] font-semibold font-['SF Pro Text'] leading-[1.4]">
        {vendor}
        <br />
        <span className="text-[12px] font-light">{brand}</span>
        <br />
        {description}
      </div>
      <div className="self-stretch text-neutral-500 text-[12px] font-light font-['SF Pro Text'] leading-[18px]">
        {`${productNumber} | ${packSize}`}
      </div>
    </div>
  );
};

export default React.memo(ProductDescription);

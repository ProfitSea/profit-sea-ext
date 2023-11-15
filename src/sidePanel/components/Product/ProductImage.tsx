import React from "react";

interface ProductImageProps {
  src: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src }) => {
  return (
    <div className="w-16 h-16 bg-white rounded-md flex justify-center items-center border-[1px] border-zinc-300 ">
      <img
        className="w-[62px] h-[62px] p-[2px] rounded-md max-w-none"
        src={src}
      />
    </div>
  );
};

export default React.memo(ProductImage);

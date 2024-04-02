import React from "react";
import { ListItemInterface } from "../../../utils/types/product-response.type";
const ProductImage = React.lazy(() => import("./ProductImage"));
const ProductDescription = React.lazy(() => import("./ProductDescription"));
const AnchorAndMapButtons = React.lazy(() => import("./AnchorAndMapButtons"));

interface ProductTypeProps {
  listItem: ListItemInterface;
}

const ProductType: React.FC<ProductTypeProps> = ({ listItem }) => {
  const { product } = listItem;

  return (
    <div className="w-[100%] px-3.5 bg-white flex-col justify-start items-start gap-3.5 inline-flex">
      <div className="self-stretch py-[17px] bg-white flex-col justify-start items-start gap-3.5 flex">
        <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
          <ProductImage src={product.imgSrc} />
          <ProductDescription
            vendor={product.vendor.name}
            brand={product.brand}
            description={product.description}
            productNumber={product.productNumber}
            packSize={product.packSize}
          />
          <AnchorAndMapButtons listItem={listItem} />
        </div>
      </div>
    </div>
  );
};

export default ProductType;

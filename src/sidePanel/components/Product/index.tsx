import React from "react";
import {
  ListItemInterface,
  SaleUnitQuantityInterface,
} from "../../../utils/types/product-response.type";
const ProductImage = React.lazy(() => import("./ProductImage"));
const ProductDescription = React.lazy(() => import("./ProductDescription"));
const SaleUnitQuantity = React.lazy(() => import("./SaleUnitQuantity"));

interface ProductProps {
  listItem: ListItemInterface;
  removeListItemFromState: (listItemId: string) => void;
  updateListItemQuantityInState: ({
    saleUnitQuantityId,
    quantity,
    listItemId,
  }: {
    saleUnitQuantityId: string;
    quantity: number;
    listItemId: string;
  }) => void;
}

const Product: React.FC<ProductProps> = ({
  listItem,
  removeListItemFromState,
  updateListItemQuantityInState,
}) => {
  const { product } = listItem;

  return (
    <div className="w-[100%] px-3.5 bg-white flex-col justify-start items-start gap-3.5 inline-flex">
      <div className="self-stretch py-[17px] bg-white flex-col justify-start items-start gap-3.5 flex">
        <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
          <ProductImage src={product.imgSrc} />
          <ProductDescription
            vendor={product.vendor}
            brand={product.brand}
            description={product.description}
            productNumber={product.productNumber}
            packSize={product.packSize}
          />
          <div className="justify-center items-center gap-2.5 flex">
            <div className="max-h-[200px] flex-col justify-start items-center flex gap-3">
              {listItem.saleUnitQuantities.map(
                (saleUnitQuantity: SaleUnitQuantityInterface) => (
                  <div key={saleUnitQuantity._id}>
                    <SaleUnitQuantity
                      saleUnitQuantity={saleUnitQuantity}
                      listItemId={listItem.id}
                      removeListItemFromState={removeListItemFromState}
                      updateListItemQuantityInState={
                        updateListItemQuantityInState
                      }
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

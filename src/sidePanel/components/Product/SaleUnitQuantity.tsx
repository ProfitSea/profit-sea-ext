// SaleUnitQuantity.tsx
import { DeleteOutlined } from "@mui/icons-material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ProductInterface,
  SaleUnitQuantityInterface,
} from "../../../utils/types/product-response.type";
import listsApi from "../../../api/listsApi";
import { debounce } from "../../../utils/functions/debounce.function";

interface SaleUnitQuantityProps {
  saleUnitQuantity: SaleUnitQuantityInterface;
  product: ProductInterface;
  deleteProduct: (productId: string) => void;
  listItemId: string;
  updateListItemQuantityInState: ({
    saleUnitId,
    quantity,
    listItemId,
  }: {
    saleUnitId: string;
    quantity: number;
    listItemId: string;
  }) => void;
}

const SaleUnitQuantity: React.FC<SaleUnitQuantityProps> = ({
  saleUnitQuantity,
  product,
  listItemId,
  deleteProduct,
  updateListItemQuantityInState,
}) => {
  const [quantity, setQuantity] = useState(saleUnitQuantity.quantity);
  const saleUnitId = saleUnitQuantity.saleUnit as string;
  const [loading, setLoading] = useState(false);
  const saleUnit = useMemo(
    () => product.saleUnits.find((unit) => unit.id === saleUnitId),
    [product.saleUnits, saleUnitId]
  );
  const price = saleUnit?.price?.price;
  const unit = saleUnit?.unit;
  const { _id } = saleUnitQuantity;

  const updateListItemQuantity = async (newQuantity: number) => {
    try {
      setLoading(true);
      const payload = {
        saleUnitId: saleUnitId as string,
        quantity: newQuantity as number,
        listItemId: listItemId as string,
      };
      await listsApi.updateListItemQuantity(payload);
      updateListItemQuantityInState(payload);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedUpdateListItemQuantity = useCallback(
    debounce(updateListItemQuantity, 500),
    []
  );

  const updateQuantity = useCallback(
    (newQuantity: number) => {
      // Update quantity in state
      setQuantity(newQuantity);
      // Debounce API call or update logic
      debouncedUpdateListItemQuantity(newQuantity);
    },
    [debouncedUpdateListItemQuantity]
  );

  // Handle increment
  const incrementQuantity = () => updateQuantity(quantity + 1);

  // Handle decrement
  const decrementQuantity = () => {
    if (quantity > 0) updateQuantity(quantity - 1);
  };

  useEffect(() => {
    // Cleanup function
    return () => {
      setQuantity(0); // Reset quantity
      setLoading(false); // Reset loading
    };
  }, []);

  return (
    <div key={_id}>
      <div className="w-[87px] h-[30px] text-center text-zinc-800 text-sm font-semibold font-['SF Pro Text'] leading-[21px]">
        {`${price} ${unit}`}
      </div>

      <div className="w-[90px] h-[23px] relative">
        <button
          disabled={loading}
          onClick={incrementQuantity}
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
        {quantity !== 0 ? (
          <button
            disabled={loading}
            onClick={decrementQuantity}
            className="w-[21px] h-[21px] left-[69px] top-[1px] absolute bg-stone-800 rounded-xl justify-center items-center gap-2.5 inline-flex"
          >
            <div className="text-white text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
              -
            </div>
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={() => deleteProduct("123")}
            className="w-[21px] h-[21px] left-[69px] top-[1px] absolute justify-center items-center gap-2.5 inline-flex"
          >
            <div className="text-stone-800 text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
              <DeleteOutlined />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default React.memo(SaleUnitQuantity);

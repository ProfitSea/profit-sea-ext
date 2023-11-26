// SaleUnitQuantity.tsx
import React, { useCallback, useEffect, useState } from "react";
import listsApi from "../../../api/listsApi";
import { debounce } from "../../../utils/functions/debounce.function";
import { SaleUnitQuantityInterface } from "../../../utils/types/product-response.type";
import { currentListSelector, setError } from "../../redux/app/appSlice";
import { updateListItemCount } from "../../redux/lists/listsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import UpdateQuantityButton from "./UpdateQuantityButton";
import DeleteProductListItem from "./DeleteProduct";

interface SaleUnitQuantityProps {
  saleUnitQuantity: SaleUnitQuantityInterface;
  removeListItemFromState: (listItemId: string) => void;
  listItemId: string;
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

const SaleUnitQuantity: React.FC<SaleUnitQuantityProps> = ({
  saleUnitQuantity,
  listItemId,
  removeListItemFromState,
  updateListItemQuantityInState,
}) => {
  const [quantity, setQuantity] = useState(saleUnitQuantity.quantity);
  const [loading, setLoading] = useState(false);
  const { _id } = saleUnitQuantity;
  const currentList = useAppSelector(currentListSelector);
  const dispatch = useAppDispatch();

  const updateListItemQuantity = async (newQuantity: number) => {
    try {
      setLoading(true);
      const payload = {
        saleUnitQuantityId: _id as string,
        quantity: newQuantity as number,
        listItemId: listItemId as string,
      };
      await listsApi.updateListItemQuantity({
        saleUnitId: saleUnitQuantity.saleUnit.id,
        listItemId,
        quantity: newQuantity,
      });
      updateListItemQuantityInState(payload);
    } catch (error) {
      console.log(error);
      dispatch(setError("Failed to Update the quantity"));
    } finally {
      setLoading(false);
    }
  };

  const deleteListItem = async () => {
    try {
      setLoading(true);
      await listsApi.deleteListItem(currentList.id, listItemId);
      removeListItemFromState(listItemId);
      dispatch(updateListItemCount({ listId: currentList.id }));
    } catch (error) {
      dispatch(setError("Failed to delete the item"));
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
      if (newQuantity === 0) setLoading(true);
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
        {`${saleUnitQuantity.price.price} ${saleUnitQuantity.saleUnit.unit}`}
      </div>

      <div className="w-[90px] h-[23px] relative">
        <UpdateQuantityButton
          loading={loading}
          updateQuantity={incrementQuantity}
          updateTitle="+"
        />
        <div className="w-[26px] h-[23px] left-[33px] top-0 absolute rounded-[5px] border border-slate-200" />
        <div className="w-5 left-[36px] top-[2.50px] absolute text-center text-black text-xs font-semibold font-['SF Pro Text'] leading-[18px]">
          {quantity}
        </div>
        {quantity !== 0 ? (
          <UpdateQuantityButton
            loading={loading}
            updateQuantity={decrementQuantity}
            updateTitle="-"
          />
        ) : (
          <DeleteProductListItem
            loading={loading}
            deleteListItem={deleteListItem}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(SaleUnitQuantity);

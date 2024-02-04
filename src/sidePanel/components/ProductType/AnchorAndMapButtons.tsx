// AnchorAndMapButtons.tsx
import React, { useState } from "react";
import ButtonType from "./ButtonType";

interface AnchorAndMapButtonsProps {}

const AnchorAndMapButtons: React.FC<AnchorAndMapButtonsProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  // const currentList = useAppSelector(currentListSelector);
  // const dispatch = useAppDispatch();

  // const updateListItemQuantity = async (newQuantity: number) => {
  //   try {
  //     setLoading(true);
  //     await listsApi.updateListItemQuantity({
  //       saleUnitId: AnchorAndMapButtons.saleUnit.id,
  //       listItemId,
  //       quantity: newQuantity,
  //     });
  //     dispatch(
  //       updateQuantityInRedux({
  //         AnchorAndMapButtonsId: _id as string,
  //         quantity: newQuantity as number,
  //         listItemId: listItemId as string,
  //       })
  //     );
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(setError("Failed to Update the quantity"));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const debouncedUpdateListItemQuantity = useCallback(
  //   debounce(updateListItemQuantity, 500),
  //   []
  // );

  // const updateQuantity = useCallback(
  //   (newQuantity: number) => {
  //     if (newQuantity === 0) setLoading(true);
  //     if (newQuantity > 99) newQuantity = 99;
  //     // Update quantity in state
  //     // Debounce API call or update logic
  //     debouncedUpdateListItemQuantity(newQuantity);
  //   },
  //   [debouncedUpdateListItemQuantity]
  // );

  return (
    <div className="justify-center items-center gap-2.5 flex">
      <div className="max-h-[200px] flex-row justify-start items-center flex gap-3">
        {/* <ButtonType
          imgSrc="/assets/icons/map.svg"
          altText="map"
          onClick={() => {}}
          loading={loading}
        /> */}
        <ButtonType
          imgSrc="/assets/icons/anchor.svg"
          altText="anchor"
          onClick={() => {}}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default React.memo(AnchorAndMapButtons);

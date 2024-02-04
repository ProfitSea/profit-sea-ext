// AnchorAndMapButtons.tsx
import React, { useState } from "react";
import listsItemsApi from "../../../api/listsItemsApi";
import { ListItemInterface } from "../../../utils/types/product-response.type";
import { setError } from "../../redux/app/appSlice";
import { useAppDispatch } from "../../redux/store";
import ButtonType from "./ButtonType";

interface AnchorAndMapButtonsProps {
  listItem: ListItemInterface;
}

const AnchorAndMapButtons: React.FC<AnchorAndMapButtonsProps> = ({
  listItem,
}) => {
  const [loading, setLoading] = useState(false);
  const [isAnchored, setIsAnchored] = useState(listItem.isAnchored || false);
  const dispatch = useAppDispatch();

  const toggleProductAnchor = async () => {
    try {
      setLoading(true);
      await listsItemsApi.toggleListItemAnchor(listItem.id as string);
      setIsAnchored(!isAnchored);
    } catch (error) {
      console.log(error);
      dispatch(setError("Failed to Mark the product as Anchored"));
    } finally {
      setLoading(false);
    }
  };

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
          imgSrc={
            isAnchored
              ? "/assets/icons/anchored.svg"
              : "/assets/icons/anchor.svg"
          }
          tip={isAnchored ? "Remove Anchor" : "Mark as Anchor"}
          altText="anchor"
          onClick={toggleProductAnchor}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default React.memo(AnchorAndMapButtons);

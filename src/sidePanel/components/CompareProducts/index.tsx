import Delete from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React, { useState } from "react";
import { ListItemInterface } from "../../../utils/types/product-response.type";
import CustomDivider from "../CustomDivider";
import ProductsListModal from "./ProductListModal";
import listsItemsApi from "../../../api/listsItemsApi";
import { setError } from "../../redux/app/appSlice";
import {
  removeComparisonListItem as removeComparisonListItemFromRedux,
  addComparisonListItem as addComparisonListItemInRedux,
} from "../../redux/lists/listsSlice";
import { useAppDispatch } from "../../redux/store";
import { IconButton } from "@mui/material";
const ProductImage = React.lazy(() => import("./ProductImage"));
const ProductDescription = React.lazy(() => import("./ProductDescription"));

interface CompareProductsProps {
  listItem: ListItemInterface;
}

const CompareProducts: React.FC<CompareProductsProps> = ({ listItem }) => {
  const { product } = listItem;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const comparisonProductsLength = listItem.comparisonProducts.length;
  const isAnchored = listItem.isAnchored;
  const dispatch = useAppDispatch();

  const removeComparisonListItem = async (
    baseListItemId: string,
    comparisonListItemId: string
  ) => {
    try {
      setLoading(true);
      await listsItemsApi.removeComparisonListItem(
        baseListItemId,
        comparisonListItemId
      );
      dispatch(
        removeComparisonListItemFromRedux({
          baseListItemId,
          comparisonListItemId,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(setError("Failed to remove the product from comparison"));
    } finally {
      setLoading(false);
    }
  };

  const addComparisonListItem = async (
    baseListItemId: string,
    comparisonListItemId: string
  ) => {
    try {
      setLoading(true);
      await listsItemsApi.addComparisonListItem(
        baseListItemId,
        comparisonListItemId
      );
      dispatch(
        addComparisonListItemInRedux({
          baseListItemId,
          comparisonListItemId,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(setError("Failed to add the product to compare"));
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <div
      key={listItem.id}
      className="w-[100%] bg-white flex-col justify-start items-start inline-flex"
    >
      <div className="self-stretch px-3.5 py-[17px] bg-white flex-col justify-start items-start gap-3.5 flex">
        <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
          <ProductImage src={product.imgSrc} />
          <ProductDescription
            vendor={product.vendor}
            brand={product.brand}
            description={product.description}
            productNumber={product.productNumber}
            packSize={product.packSize}
          />
        </div>
      </div>
      {isAnchored ? (
        <div className="bg-[#F5F5F5] px-3.5 py-2 w-[100%] flex-row justify-start items-center gap-3.5 inline-flex cursor-not-allowed">
          <img
            width={"25px"}
            src={"/assets/icons/anchored.svg"}
            alt={"Anchored"}
          />

          <p className="text-[13px]">Anchored Product (Cannot be compared)</p>
        </div>
      ) : (
        <>
          {comparisonProductsLength === 0 && (
            <div
              onClick={() => setOpen(true)}
              className="bg-[#F5F5F5] px-3.5 py-2 w-[100%] flex-row justify-start items-center gap-3.5 inline-flex cursor-pointer"
            >
              <AddCircleOutlineIcon className="text-[#8391A1] text-[25px]" />
              <p className="text-[13px]">
                Add a product to compare side by side
              </p>
            </div>
          )}
        </>
      )}

      {comparisonProductsLength > 0 &&
        !isAnchored &&
        listItem.comparisonProducts.map(
          (item: ListItemInterface, index: number) => (
            <div
              key={`${index}_${item.id}`}
              className="self-stretch bg-white flex-col justify-start items-start gap-3.5 flex"
            >
              <div className="self-stretch px-3.5 text-zinc-800 text-[13px] font-semibold font-['SF Pro Text'] leading-[1.4]">
                {"Comparing With: "}
              </div>
              <div className="w-[100%] px-3.5 bg-white flex-col justify-start items-start gap-3.5 inline-flex">
                <div className="self-stretch py-[17px] bg-white flex-col justify-start items-start gap-3.5 flex">
                  <div className="self-stretch justify-start items-center gap-3.5 inline-flex">
                    <ProductImage src={item.product.imgSrc} />
                    <ProductDescription
                      vendor={item.product.vendor}
                      brand={item.product.brand}
                      description={item.product.description}
                      productNumber={item.product.productNumber}
                      packSize={item.product.packSize}
                    />
                    <IconButton
                      aria-label="delete"
                      disabled={loading}
                      onClick={async () => {
                        await removeComparisonListItem(listItem.id, item.id);
                      }}
                      color="warning"
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      <CustomDivider orientation="horizontal" />
      <ProductsListModal
        open={open}
        setOpen={setOpen}
        listItem={listItem}
        loading={loading}
        addComparisonListItem={addComparisonListItem}
      />
    </div>
  );
};

export default CompareProducts;

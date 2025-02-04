import { CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import listsApi from "../../../api/listsApi";
import CustomDivider from "../../components/CustomDivider";
import AnalysisProduct from "./AnalysisProduct";

interface ProductsAnalysisProps {
  currentList: any;
  setError: (error: string) => void;
}

const ProductsAnalysis: React.FC<ProductsAnalysisProps> = ({
  currentList,
  setError,
}) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [analyzedList, setAnalyzedList] = useState<[]>();

  const getAnalysis = useCallback(async (listId: string) => {
    setLoading(true);
    try {
      const data = await listsApi.getListsAnalysis(listId);
      console.log(data);
      setAnalyzedList(data.list);
    } catch (err: any) {
      console.error(err.message);
      setError(`Failed to fetch list items:  ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!currentList.id) return;
    getAnalysis(currentList.id);
  }, [currentList.id, getAnalysis]);

  if (loading) {
    return (
      <div className="bg-[#F5F5F5] flex-grow flex flex-col overflow-y-auto">
        <div className="flex flex-1 justify-center items-center">
          <CircularProgress className="color-[#F5F5F5] text-sm" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] flex-grow flex flex-col overflow-y-auto">
      {analyzedList?.length === 0 ? (
        <div className="flex flex-1 justify-center items-center">
          <p className="text-sm text-gray-500">No products to analyze</p>
        </div>
      ) : (
        analyzedList?.map((item: any) => (
          <React.Fragment key={item.id}>
            <AnalysisProduct listItem={item} />
            <CustomDivider orientation="horizontal" />
          </React.Fragment>
        ))
      )}
    </div>
  );
};

export default ProductsAnalysis;

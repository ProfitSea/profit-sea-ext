import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Pages } from "../../../utils/enums/pages.enum";
import BottomNavigationButton from "../../components/BottomNavigationButtion";
import BreadCrumbs from "../../components/BreadCrumbs";
import CustomDivider from "../../components/CustomDivider";
import ErrorNotification from "../../components/ErrorNotification";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ListName from "../../components/ListName";
import TagFilters from "../../components/TagFilters";
import useApi from "./useList";
import { CircularProgress } from "@mui/material";

const ListBuilder = React.lazy(() => import("../ListBuilder"));
const ProductsAnalysis = React.lazy(() => import("../ProductsAnalysis"));
const ProductsType = React.lazy(() => import("../ProductsType"));
const Compare = React.lazy(() => import("../Compare"));

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  const [page, setPage] = useState(Pages.LIST_BUILDER);
  const [productFilter, setProductFilter] = React.useState<string | null>(null);
  const {
    lists,
    loading,
    error,
    selectValue,
    setSelectValue,
    fetchLists,
    createNewList,
    currentList,
    setCurrentList,
    updateListName,
    setError,
    setVendorFilter,
  } = useApi();

  useLayoutEffect(() => {
    chrome.storage.local.get(["profit_sea_page"], (result) => {
      if (result.profit_sea_page) {
        setPage(result.profit_sea_page);
      }
    });
  }, []);

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const renderPageContent = useCallback(() => {
    switch (page) {
      case Pages.LIST_BUILDER:
        return <ListBuilder currentList={currentList} setError={setError} />;
      case Pages.PRODUCTS_ANALYSIS:
        return <ProductsAnalysis currentList={currentList} setError={setError} />;
      case Pages.PRODUCTS_TYPE:
        return <ProductsType currentList={currentList} setError={setError} />;
      case Pages.COMPARE:
        return <Compare currentList={currentList} setError={setError} />;
      default:
        return <ListBuilder currentList={currentList} setError={setError} />;
    }
  }, [page, currentList]);

  const handleUpdateSelectValue = useCallback(
    (value: string) => {
      switch (value) {
        case "createNewList":
          // createNewList
          createNewList();
          break;
        case "0":
          setCurrentList({} as any);
          setSelectValue(value);
          break;
        case "loading":
          break;
        default:
          const list = lists.find((list: any) => list.id === value);
          if (list) {
            setCurrentList(list);
          }
          setSelectValue(value);
          break;
      }
    },
    [lists, createNewList]
  );

  const handleSelectValueChange = useCallback(handleUpdateSelectValue, [
    lists,
    createNewList,
  ]);

  // Close the error manually
  const handleCloseError = () => {
    setError("");
  };

  return (
    <React.Suspense
      fallback={
        <div className="h-[100vh] bg-black flex justify-center items-center">
          <CircularProgress />
        </div>
      }
    >
      <div className="flex flex-col min-h-screen">
        <ErrorNotification error={error} handleCloseError={handleCloseError} />
        <Header
          lists={lists}
          selectValue={selectValue}
          loading={loading}
          handleUpdateSelectValue={handleSelectValueChange}
        />
        <div className="flex-1 flex flex-col">
          <CustomDivider orientation="horizontal" />
          <ListName
            currentList={currentList}
            updateListName={updateListName}
            loading={loading}
          />
          <CustomDivider orientation="horizontal" />
          <BreadCrumbs page={page} setPage={setPage} />
          <CustomDivider orientation="horizontal" />
          <TagFilters
            setVendorFilter={setVendorFilter}
            setProductFilter={setProductFilter}
          />
          <CustomDivider orientation="horizontal" />
          {renderPageContent()}
          <CustomDivider orientation="horizontal" />
          <BottomNavigationButton page={page} setPage={setPage} />
        </div>
        <Footer />
      </div>
    </React.Suspense>
  );
};

export default DefaultLayout;

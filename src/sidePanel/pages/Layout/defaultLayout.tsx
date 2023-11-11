import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
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
import ListBuilder from "../ListBuilder";
import ProductsAnalysis from "../ProductsAnalysis";
import ProductsType from "../ProductsType";
import useApi from "./useList";

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  const [page, setPage] = useState(Pages.LIST_BUILDER);
  const [vendorFilter, setVendorFilter] = useState<string | null>("all");
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

  const renderPages = useMemo(() => {
    switch (page) {
      case Pages.LIST_BUILDER:
        return (
          <ListBuilder
            currentList={currentList}
            vendorFilter={vendorFilter}
            productFilter={productFilter}
          />
        );
      case Pages.PRODUCTS_ANALYSIS:
        return <ProductsAnalysis />;
      case Pages.PRODUCTS_TYPE:
        return <ProductsType />;
      default:
        return (
          <ListBuilder
            currentList={currentList}
            vendorFilter={vendorFilter}
            productFilter={productFilter}
          />
        );
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

  // Close the error manually
  const handleCloseError = () => {
    setError(null);
  };

  // Automatically close the error after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // 5 seconds

      // Clear the timeout if the component is unmounted before the time completes
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <ErrorNotification error={error} handleCloseError={handleCloseError} />
      <Header
        lists={lists}
        selectValue={selectValue}
        loading={loading}
        handleUpdateSelectValue={handleUpdateSelectValue}
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
        {renderPages}
        <CustomDivider orientation="horizontal" />
        <BottomNavigationButton page={page} setPage={setPage} />
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

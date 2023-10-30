import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import listsApi from "../../../api/listsApi";
import BreadCrumbs from "../../components/BreadCrumbs";
import CustomButton from "../../components/CustomButton";
import CustomDivider from "../../components/CustomDivider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ListName from "../../components/ListName";
import ListBuilder from "../ListBuilder";
import ProductsAnalysis from "../ProductsAnalysis";
import ProductsType from "../ProductsType";
import TagFilters from "../../components/TagFilters";
import ErrorNotification from "../../components/ErrorNotification";

interface DefaultLayoutProps {}

const DefaultLayout: React.FC<DefaultLayoutProps> = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState("listbuilder");
  const [vendorFilter, setVendorFilter] = useState<string | null>("all");
  const [productFilter, setProductFilter] = React.useState<string | null>(null);
  const [lists, setLists] = useState([] as any);
  const [selectValue, setSelectValue] = useState("0");
  const [currentList, setCurrentList] = useState({} as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    chrome.storage.local.get(["profit_sea_page"], (result) => {
      if (result.profit_sea_page) {
        setPage(result.profit_sea_page);
      }
    });
  }, []);

  const fetchLists = useCallback(async () => {
    try {
      setLoading(true);
      const res = await listsApi.getLists();
      setLists(res.result.results);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch lists");
      setLoading(false);
    }
  }, []);

  const createNewList = async () => {
    try {
      setLoading(true);
      const res = await listsApi.createList();
      setLists([...lists, res.list]);
      setCurrentList(res.list);
      setSelectValue(res.list.id);
      setLoading(false);
    } catch (error) {
      setError("Failed to Create New List");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [fetchLists]);

  const renderPages = useMemo(() => {
    switch (page) {
      case "listbuilder":
        return <ListBuilder currentList={currentList} />;
      case "productsAnalysis":
        return <ProductsAnalysis />;
      case "productsType":
        return <ProductsType />;
      default:
        return <ListBuilder currentList={currentList} />;
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

  const updateListName = async (name: string) => {
    try {
      setLoading(true);
      await listsApi.updateListName(currentList.id, name as string);
      await fetchLists();
      setCurrentList({ ...currentList, name });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to Update the list name");
      console.log(error);
    }
  };

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
        setSelectValue={handleUpdateSelectValue}
        loading={loading}
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
        <div className="h-[60px] px-[10px] flex items-center justify-center">
          <CustomButton
            title="Continue to Product Type"
            bgColor="#FBBB00"
            textColor="white"
            onClick={() => {
              navigate("/productsType");
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;

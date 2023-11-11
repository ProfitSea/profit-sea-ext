import { useCallback, useEffect, useState } from "react";
import listsApi from "../../../api/listsApi";
import ChromeLocalStorage from "../../../utils/StorageFunctions/localStorage.function";
import { MessagingActions } from "../../../utils/actions/messagingActions.enum";
import {
  currentListSelector,
  resetVendorTagsCount,
  selectValueSelector,
  setCurrentList as setReduxCurrentList,
  setSelectValue as setReduxSelectValue,
  setVendorFilter as setVendorFilterRedux,
} from "../../redux/app/appSlice";
import {
  listsSelector,
  setLists as setReduxLists,
  updateListName as updateListNameRedux,
} from "../../redux/lists/listsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentList = useAppSelector(currentListSelector);
  const lists = useAppSelector(listsSelector);
  const selectValue = useAppSelector(selectValueSelector);
  const dispatch = useAppDispatch();

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

  const setCurrentList = (list: any) => {
    dispatch(setReduxCurrentList(list));
  };

  const setVendorFilter = (value: string) => {
    dispatch(setVendorFilterRedux(value));
  };

  const setLists = (lists: any) => {
    dispatch(setReduxLists(lists));
  };

  const setSelectValue = (value: string) => {
    dispatch(setReduxSelectValue(value));
  };

  const createNewList = async () => {
    try {
      setLoading(true);
      const res = await listsApi.createList();
      setLists([...lists, res.list]);
      setCurrentList(res.list);
      setSelectValue(res.list.id as string);
      setLoading(false);
    } catch (error) {
      setError("Failed to Create New List");
      setLoading(false);
    }
  };

  const updateListName = async (id: string, name: string) => {
    try {
      setLoading(true);
      await listsApi.updateListName(id, name);
      setCurrentList({ ...currentList, name });
      dispatch(updateListNameRedux({ listId: id, name }));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to Update the list name");
      console.log(error);
    }
  };

  const messageListener = async (request: any) => {
    if (request.action === MessagingActions.REFRESH_CURRENT_LIST) {
      try {
        const [{ list }] = await Promise.all([
          listsApi.getListById(request.listId),
          fetchLists(),
        ]);
        setCurrentList(list);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    // Add the listener when the component mounts
    chrome.runtime.onMessage.addListener(messageListener);

    // Remove the listener when the component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
      setCurrentList({} as any);
      ChromeLocalStorage.setCurrentList(null);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  useEffect(() => {
    ChromeLocalStorage.setCurrentList(currentList);
    // reset vendorTags count
    dispatch(resetVendorTagsCount());
  }, [currentList]);

  return {
    lists,
    loading,
    error,
    setError,
    currentList,
    selectValue,
    setSelectValue,
    setCurrentList,
    fetchLists,
    createNewList,
    updateListName,
    setVendorFilter,
  };
};

export default useApi;

import { useCallback, useEffect, useState } from "react";
import listsApi from "../../../api/listsApi";
import ChromeLocalStorage from "../../../utils/StorageFunctions/localStorage.function";
import { MessagingActions } from "../../../utils/actions/messagingActions.enum";
import {
  currentListSelector,
  errorSelector,
  resetVendorTagsCount,
  selectValueSelector,
  setCurrentList as setReduxCurrentList,
  setSelectValue as setReduxSelectValue,
  setVendorFilter as setVendorFilterRedux,
  setError as setErrorRedux,
} from "../../redux/app/appSlice";
import {
  addListAndListItem,
  listsSelector,
  pushListItem,
  setLists as setReduxLists,
  updateListName as updateListNameRedux,
} from "../../redux/lists/listsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [shouldCreateNewList, setShouldCreateNewList] = useState(false);

  const currentList = useAppSelector(currentListSelector);
  const lists = useAppSelector(listsSelector);
  const selectValue = useAppSelector(selectValueSelector);
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorSelector);

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

  const setError = (error: string) => {
    dispatch(setErrorRedux(error));
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

  useEffect(() => {
    if (shouldCreateNewList) {
      const createList = async () => {
        try {
          setLoading(true);
          const res = await listsApi.createList();
          setLists([...lists, res.list]);
          setCurrentList(res.list);
          setSelectValue(res.list.id as string);
        } catch (error) {
          setError("Failed to Create New List");
        } finally {
          setLoading(false);
          setShouldCreateNewList(false);
        }
      };

      createList();
    }
  }, [shouldCreateNewList]);

  const createNewList = () => {
    setShouldCreateNewList(true);
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

  const messageListener = async (
    request: any,
    sender: any,
    sendResponse: any
  ) => {
    if (!request.action) return;

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
    } else if (request.action === MessagingActions.ADD_LIST_ITEM) {
      try {
        const { listId, listItem } = request;
        dispatch(pushListItem({ listId, listItem: listItem }));
      } catch (error) {
        setError("Failed to add product in the List");
        console.log(error);
      }
    } else if (request.action === MessagingActions.ADD_LIST_AND_LIST_ITEM) {
      try {
        const { list, listItem } = request;
        const newList = { ...list, itemsCount: 1, items: [listItem.id] };
        setCurrentList(newList);
        setSelectValue(list.id as string);
        dispatch(addListAndListItem({ list: newList, listItem: listItem }));
      } catch (error) {
        setError("Failed to add product in the List");
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

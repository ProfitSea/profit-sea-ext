import { useCallback, useEffect, useRef, useState } from "react";
import listsApi from "../../../api/listsApi";
import ChromeLocalStorage from "../../../utils/StorageFunctions/localStorage.function";
import { MessagingActions } from "../../../utils/actions/messagingActions.enum";
import {
  currentListSelector,
  errorSelector,
  resetVendorTagsCount,
  selectValueSelector,
  setError as setErrorRedux,
  setCurrentList as setReduxCurrentList,
  setSelectValue as setReduxSelectValue,
  setVendorFilter as setVendorFilterRedux,
} from "../../redux/app/appSlice";
import {
  addListAndListItem as addListAndListItemInRedux,
  listsSelector,
  pushListItem,
  setLists as setReduxLists,
  updateListName as updateListNameRedux,
} from "../../redux/lists/listsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { refreshVendorsWebpages } from "../../../utils/actions/messageToBackground";
import { ListInterface } from "../../../utils/types/product-response.type";

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [shouldCreateNewList, setShouldCreateNewList] = useState(false);

  const currentList = useAppSelector(currentListSelector);
  const lists = useAppSelector(listsSelector);
  const selectValue = useAppSelector(selectValueSelector);
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorSelector);
  const currentListRef = useRef<ListInterface>();
  const errorRef = useRef<string>();

  // Whenever `currentList` or `error` changes, update the refs
  useEffect(() => {
    if (currentList) {
      currentListRef.current = currentList;
    }
    if (error) {
      errorRef.current = error;
    }
  }, [currentList, error]);

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
    const currentList = currentListRef.current;
    if (currentList?.id) {
      if (!list.id) {
        refreshVendorsWebpages();
      } else if (list.id && list.id !== currentList.id) {
        refreshVendorsWebpages();
      }
    } else if (list.id) {
      refreshVendorsWebpages();
    }
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

  const refreshCurrentList = async (listId: string) => {
    try {
      setCurrentList({});
      const [{ list }] = await Promise.all([
        listsApi.getListById(listId),
        fetchLists(),
      ]);
      setCurrentList(list);
    } catch (error) {
      console.log(error);
    }
  };

  const addListItem = async (request: any) => {
    try {
      const { list, listItem } = request;
      setCurrentList({
        ...list,
        itemsCount: list.itemsCount + 1,
        listItems: [...list.listItems, listItem.id],
      });
      dispatch(pushListItem({ listId: list.id, listItem: listItem }));
    } catch (error) {
      setError("Failed to add product in the List");
      console.log(error);
    }
  };

  const addListAndListItem = async (request: any) => {
    try {
      const { list, listItem } = request;
      const newList = { ...list, itemsCount: 1, listItems: [listItem.id] };
      setCurrentList(newList);
      setSelectValue(list.id as string);
      dispatch(
        addListAndListItemInRedux({ list: newList, listItem: listItem })
      );
    } catch (error) {
      setError("Failed to add product in the List");
      console.log(error);
    }
  };

  const messageListener = (request: any, sender: any, sendResponse: any) => {
    if (!request.action) return;

    if (request.action === MessagingActions.REFRESH_CURRENT_LIST) {
      refreshCurrentList(request.listId);
    } else if (request.action === MessagingActions.ADD_LIST_ITEM) {
      addListItem(request);
    } else if (request.action === MessagingActions.ADD_LIST_AND_LIST_ITEM) {
      addListAndListItem(request);
    }
  };

  useEffect(() => {
    const listener = (request: any, sender: any, sendResponse: any) => {
      // Call messageListener with the current values from the refs
      messageListener(request, sender, sendResponse);
    };

    // Add the listener when the component mounts
    chrome.runtime.onMessage.addListener(listener);

    // Remove the listener when the component unmounts
    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, []);
  useEffect(() => {
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

import { useCallback, useEffect, useState } from "react";
import listsApi from "../../../api/listsApi";
import ChromeLocalStorage from "../../../utils/StorageFunctions/localStorage.function";
import { MessagingActions } from "../../../utils/actions/messagingActions.enum";

const useApi = () => {
  const [lists, setLists] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentList, setCurrentList] = useState({} as any);
  const [selectValue, setSelectValue] = useState("0");

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

  const updateListName = async (id: string, name: string) => {
    try {
      setLoading(true);
      await listsApi.updateListName(id, name);
      setCurrentList({ ...currentList, name });
      await fetchLists();
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
        const { list } = await listsApi.getListById(request.listId);
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
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  useEffect(() => {
    if (currentList.id) {
      console.log("Current List is updated", currentList);

      ChromeLocalStorage.setCurrentListId(currentList.id);
    }
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
  };
};

export default useApi;

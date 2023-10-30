import { useCallback, useState } from "react";
import listsApi from "../../../api/listsApi";

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
      await fetchLists();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("Failed to Update the list name");
      console.log(error);
    }
  };

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

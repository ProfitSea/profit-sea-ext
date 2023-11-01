import { identifiers } from "../enums/identifier.enum";

const setCurrentListId = (listId: string) => {
  chrome.storage.local.set({
    [identifiers.PROFITSEA_CURRENT_LIST_ID]: listId,
  });
};

const getCurrentListId = () => {
  return chrome.storage.local.get(identifiers.PROFITSEA_CURRENT_LIST_ID);
};

const ChromeLocalStorage = {
  setCurrentListId,
  getCurrentListId,
};

export default ChromeLocalStorage;

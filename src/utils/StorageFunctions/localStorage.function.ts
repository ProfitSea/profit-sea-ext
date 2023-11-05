import { identifiers } from "../enums/identifier.enum";

const setCurrentList = (list: any) => {
  chrome.storage.local.set({
    [identifiers.PROFITSEA_CURRENT_LIST]: list,
  });
};

const getCurrentList = () => {
  return chrome.storage.local.get(identifiers.PROFITSEA_CURRENT_LIST);
};

const ChromeLocalStorage = {
  setCurrentList,
  getCurrentList,
};

export default ChromeLocalStorage;

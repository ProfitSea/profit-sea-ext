import { identifiers } from "../enums/identifier.enum";

const setCurrentList = (list: any) => {
  chrome.storage.local.set({
    [identifiers.PROFITSEA_CURRENT_LIST]: list,
  });
};

const getCurrentList = () => {
  return chrome.storage.local.get(identifiers.PROFITSEA_CURRENT_LIST);
};

const setAuthTokens = (obj: {
  [identifiers.PROFITSEA_ACCESS_TOKEN]: string;
  [identifiers.PROFITSEA_REFRESH_TOKEN]: string;
}) => {
  chrome.storage.local.set(obj);
};

const ChromeLocalStorage = {
  setCurrentList,
  getCurrentList,
  setAuthTokens,
};

export default ChromeLocalStorage;

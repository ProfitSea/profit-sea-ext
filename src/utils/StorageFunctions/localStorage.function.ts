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

const getAccessToken = () => {
  return chrome.storage.local.get(identifiers.PROFITSEA_ACCESS_TOKEN);
};

const getRefreshToken = () => {
  return chrome.storage.local.get(identifiers.PROFITSEA_REFRESH_TOKEN);
};

const removeAuthTokens = () => {
  chrome.storage.local.remove(identifiers.PROFITSEA_ACCESS_TOKEN);
  chrome.storage.local.remove(identifiers.PROFITSEA_REFRESH_TOKEN);
};

const resetChromeLocalStorageOnLogout = () => {
  chrome.storage.local.clear();
};

const ChromeLocalStorage = {
  setCurrentList,
  getCurrentList,
  setAuthTokens,
  getAccessToken,
  getRefreshToken,
  removeAuthTokens,
  resetChromeLocalStorageOnLogout,
};

export default ChromeLocalStorage;

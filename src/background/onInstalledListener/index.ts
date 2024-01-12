import { emptyCurrentList } from "../background";

export const initilaizeOnInstalledListener = () => {
  chrome.runtime.onInstalled.addListener((details) => {
    // Check the reason for installation
    if (details.reason === "install" || details.reason === "update") {
      // Query for the tabs you want to refresh, e.g., tabs with URL containing 'example.com'
      emptyCurrentList();
    }
  });
};

export const refreshVendorsWebPages = () => {
  chrome.tabs.query({ url: "https://shop.sysco.com/*" }, (tabs) => {
    for (let tab of tabs) {
      if (tab.id) {
        // Reload each tab
        chrome.tabs.reload(tab.id);
      }
    }
  });
  chrome.tabs.query({ url: "https://order.usfoods.com/*" }, (tabs) => {
    for (let tab of tabs) {
      if (tab.id) {
        // Reload each tab
        chrome.tabs.reload(tab.id);
      }
    }
  });
};

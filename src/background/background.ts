import { initilaizeOnInstalledListener } from "./onInstalledListener";
import { initilaizeOnMessageListener } from "./onMessageListener";

const initilaizeSidePanelListener = () => {
  chrome.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.log(error));
};
const initilaizeOnUpdatedListener = () => {
  chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status !== "complete") return;

    if (!tab.url || !tab.id) return;

    if (tab.url.includes("https://order.usfoods.com/desktop/lists/detail/")) {
      chrome.tabs.sendMessage(tab.id, {
        action: "usfoods_historyUpdated",
      });
    } else if (tab.url.includes("https://shop.sysco.com/app/lists")) {
      chrome.tabs.sendMessage(tab.id, { action: "sysco_historyUpdated" });
    }
  });
};

const initilaizeBackground = () => {
  initilaizeSidePanelListener();
  initilaizeOnUpdatedListener();
  initilaizeOnInstalledListener();
  initilaizeOnMessageListener();
};

initilaizeBackground();

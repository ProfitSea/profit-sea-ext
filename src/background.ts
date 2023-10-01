chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

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

chrome.runtime.onInstalled.addListener((details) => {
  // Check the reason for installation
  if (details.reason === "install" || details.reason === "update") {
    // Query for the tabs you want to refresh, e.g., tabs with URL containing 'example.com'
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
  }
});

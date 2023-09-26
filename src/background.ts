chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  if (
    details.url.includes("https://order.usfoods.com/desktop/lists/detail/")
  ) {
    chrome.tabs.sendMessage(details.tabId, { action: "historyUpdated" });
  }
});

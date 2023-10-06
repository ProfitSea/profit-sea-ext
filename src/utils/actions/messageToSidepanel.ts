export const refreshListBuilderProducts = () => {
  chrome.runtime.sendMessage({
    action: "refreshListBuilderProducts",
  });
};

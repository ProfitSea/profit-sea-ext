import listsApi from "../../api/listsApi";
import { MessagingActions } from "../../utils/actions/messagingActions.enum";
import { wrapResponse } from "../../utils/functions/wrapResponse.function";
import { refreshVendorsWebPages } from "../onInstalledListener";

export const initilaizeOnMessageListener = () => {
  chrome.runtime.onMessage.addListener(function (
    message: {
      action: MessagingActions;
      data: any;
    },
    sender: any,
    sendResponse
  ) {
    if (message.action === MessagingActions.CREATE_NOTIFICATION) {
      const notifOptions: chrome.notifications.NotificationOptions<true> = {
        type: "basic",
        iconUrl: chrome.runtime.getURL("icon.png"),
        title: message.data.title,
        message: message.data.message,
      };
      chrome.notifications.create(notifOptions);
    } else if (
      message.action === MessagingActions.OPEN_API_KEY_VERIFICATOIN_PAGE
    ) {
      chrome.tabs.create({ url: "apiKeyVerification.html" });
    } else if (message.action === MessagingActions.CHECK_EXISTING_LIST_ITEM) {
      const { productNumber } = message.data;
      wrapResponse(
        listsApi.getListItemByProductNumber(productNumber),
        sendResponse
      );
      return true;
    } else if (message.action === MessagingActions.REFRESH_VENDORS_WEBPAGES) {
      refreshVendorsWebPages();
    }
  });
};

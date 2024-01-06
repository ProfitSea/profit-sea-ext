import listsApi from "../../api/listsApi";
import { MessagingActions } from "../../utils/actions/messagingActions.enum";
import { wrapResponse } from "../../utils/functions/wrapResponse.function";

export const initilaizeOnMessageListener = () => {
  chrome.runtime.onMessage.addListener(
    async (message, sender: any, sendResponse) => {
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
      } else if (message.action === MessagingActions.CHECK_EXISTED_LIST_ITEM) {
        const { productNumber } = message.data;
        // return wrapResponse(
        //   listsApi.getListItemByProductNumber(productNumber),
        //   sendResponse
        // );
        setTimeout(() => {
          console.log("getFromBackgroundPage", productNumber);
          sendResponse({
            success: true,
            data: {
              productNumber,
              name: "test",
              listId: "test",
              _id: "test",
            },
          });
        }
        , 1000);
        return true;
      }
    }
  );
};

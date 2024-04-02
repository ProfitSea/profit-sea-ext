import { MessagingActions } from "./messagingActions.enum";

export const refreshVendorsWebpages = () => {
  chrome.runtime.sendMessage({
    action: MessagingActions.REFRESH_VENDORS_WEBPAGES,
  });
};

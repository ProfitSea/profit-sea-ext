import { MessagingActions } from "../utils/actions/messagingActions.enum";

export const createNotification = (title: string, message: string) => {
  chrome.runtime.sendMessage({
    action: MessagingActions.CREATE_NOTIFICATION,
    data: {
      title,
      message,
    },
  });
};

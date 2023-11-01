import { MessagingActions } from "./messagingActions.enum";

export const refreshCurrentList = (listId: string) => {
  chrome.runtime.sendMessage({
    action: MessagingActions.REFRESH_CURRENT_LIST,
    listId,
  });
};

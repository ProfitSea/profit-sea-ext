// import ProductInterface from "../product.interface";
import { ListItemInterface } from "../types/product-response.type";
import { MessagingActions } from "./messagingActions.enum";

export const refreshCurrentList = (listId: string) => {
  chrome.runtime.sendMessage({
    action: MessagingActions.REFRESH_CURRENT_LIST,
    listId,
  });
};

export const addListItem = (listId: string, listItem: ListItemInterface) => {
  chrome.runtime.sendMessage({
    action: MessagingActions.ADD_LIST_ITEM,
    listItem,
    listId,
  });
};

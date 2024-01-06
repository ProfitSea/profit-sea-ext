// import ProductInterface from "../product.interface";
import { getFromBackgroundPage } from "../functions/getFromBackgroundPage.function";
import {
  ListInterface,
  ListItemInterface,
} from "../types/product-response.type";
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

export const addListAndListItem = (
  list: ListInterface,
  listItem: ListItemInterface
) => {
  chrome.runtime.sendMessage({
    action: MessagingActions.ADD_LIST_AND_LIST_ITEM,
    listItem,
    list,
  });
};

export const findListItem = async (productNumber: string) => {
  const res = await getFromBackgroundPage({
    action: MessagingActions.CHECK_EXISTED_LIST_ITEM,
    data: { productNumber },
  });
  console.log("getFromBackgroundPage", res);
  return res;
};


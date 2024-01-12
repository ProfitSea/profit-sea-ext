import listsApi from "../../api/listsApi";
import { createNotification } from "../../notification";
import ChromeLocalStorage from "../../utils/StorageFunctions/localStorage.function";
import {
  addListAndListItem,
  addListItem,
} from "../../utils/actions/messageToSidepanel";
import { MessagingActions } from "../../utils/actions/messagingActions.enum";
import ProductInterface from "../../utils/product.interface";
import { ListItemInterface } from "../../utils/types/product-response.type";

export const addProductIntoList = async (product: ProductInterface) => {
  const { profitsea_current_list: list } =
    await ChromeLocalStorage.getCurrentList();
  if (!list.id) {
    const { list: newList } = await listsApi.createList();
    const { listItem } = await listsApi.addListItem(newList.id, { product });
    addListAndListItem(newList, listItem);
    return;
  }
  try {
    if (!product) return;
    const { listItem } = await listsApi.addListItem(list.id, { product });
    addListItem(list, listItem);
  } catch (err) {
    console.log(err);
    createNotification(
      "Product Uploading Failed",
      "Please contact ProfitSea Admin"
    );
  }
};

export const updateProductPrices = async (
  productNumber: ProductInterface["productNumber"],
  prices: ProductInterface["prices"]
) => {
  try {
    const [response, { profitsea_current_list: list }] = await Promise.all([
      listsApi.updatePricesByProductNumber(productNumber, prices),
      ChromeLocalStorage.getCurrentList(),
    ]);
    if (response?.listItems?.length > 0) {
      const listItemInCurrentList = response.listItems.find(
        (listItem: ListItemInterface) => listItem.list === list.id
      );
      if (listItemInCurrentList) {
        updateListItemInListItems(listItemInCurrentList);
      }
    }
  } catch (err) {
    console.log(err);
    createNotification(
      "Product Uploading Failed",
      "Please contact ProfitSea Admin"
    );
  }
};

export const updateDivButton = (div: HTMLDivElement) => {
  div.className =
    "mt-2 flex flex-row gap-[5px] items-center justify-center cursor-pointer";
  const p = document.createElement("p");
  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("assets/icons/add.png");
  img.alt = "add";
  p.textContent = "Add To ProfitSea";
  p.className = "bg-transparent font-semibold your-button-class";
  div.append(p, img);
  return div;
};

export const loginButtonOnClick = async () => {
  chrome.runtime.sendMessage({
    action: MessagingActions.OPEN_API_KEY_VERIFICATOIN_PAGE,
  });
};

export const validateProductDetails = (
  product: any,
  fieldsToCheck = [
    "vendor",
    "brand",
    "description",
    "productNumber",
    "packSize",
    "prices",
  ]
) => {
  for (const field of fieldsToCheck) {
    if (
      product[field] === null ||
      product[field] === undefined ||
      product[field] === ""
    ) {
      return `Error: ${field} is ${
        product[field] === "" ? "empty" : "missing"
      }.`;
    }

    // Additional check for the prices array to ensure it has valid entries
    if (field === "prices" && product[field].length === 0) {
      return `Error: prices array is empty.`;
    }
    if (field === "prices") {
      for (const price of product[field]) {
        if (
          price.price === undefined ||
          isNaN(price.price) ||
          price.unit === undefined ||
          price.unit === ""
        ) {
          return `Error: One of the prices is invalid or missing a unit.`;
        }
      }
    }
  }

  // If all checks pass, return null indicating no error
  return null;
};

const updateListItemInListItems = (listItem: ListItemInterface) => {
  chrome.runtime.sendMessage({
    action: MessagingActions.UPDATE_LIST_ITEM_IN_LIST_ITEMS,
    listItem,
  });
};

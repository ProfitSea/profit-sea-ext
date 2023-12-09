import listsApi from "../../api/listsApi";
import { createNotification } from "../../notification";
import ChromeLocalStorage from "../../utils/StorageFunctions/localStorage.function";
import { addListAndListItem, addListItem } from "../../utils/actions/messageToSidepanel";
import ProductInterface from "../../utils/product.interface";

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
    addListItem(list.id, listItem);
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

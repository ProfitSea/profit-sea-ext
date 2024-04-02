import ProductInterface from "../../utils/product.interface";
import { FindListItemResponseType } from "../../utils/types/FindListItemByProductNumber.type";
import {
  addProductIntoList,
  disableButtonWithCustomText,
  getText,
  loginButtonOnClick,
  parsePriceAndUnit,
  updateProductPrices,
} from "../utils";

export const getProductNumberFromCard = (row: Element) => {
  const productNumber = getText(
    row.querySelector(
      ".product-info-name .product-label-style:first-child"
    ) as HTMLElement
  );
  if (!productNumber) return null;

  return productNumber.replace(/\D/g, "");
};

export const scrapProductDetails = (row: Element) => {
  // Initializing an empty object for the product
  const product = { prices: [], vendor: "Sysco" } as any;

  // imgSrc
  const imgElement = row.querySelector(
    ".product-info-image img"
  ) as HTMLImageElement;
  if (imgElement) product.imgSrc = imgElement.src;

  // brand
  const brandElement = row.querySelector(
    ".product-info-name .product-label-style:last-child"
  ) as HTMLElement;
  product.brand = getText(brandElement);

  // description
  const descriptionElement = row.querySelector(
    ".product-info-name .product-name-label"
  ) as HTMLElement;
  product.description = getText(descriptionElement);

  // productNumber
  const productNumberElement = row.querySelector(
    ".product-info-name .product-label-style:first-child"
  ) as HTMLElement;
  product.productNumber = getText(productNumberElement);

  // packSize
  const packSizeElement = row.querySelector(
    ".product-info-name .product-label-style:nth-child(2)"
  ) as HTMLElement;
  product.packSize = getText(packSizeElement);

  // prices
  const parsePriceAndUnit = (priceElement: HTMLElement | null) => {
    if (!priceElement) return null;

    const parsedText = priceElement.innerText.split(" ");
    const price = parseFloat(parsedText[0].replace("$", ""));
    const unit = parsedText[1];

    return { price, unit };
  };

  const priceElements = Array.from(
    row.querySelectorAll(".net-price .aui-label")
  ) as HTMLElement[];

  for (const priceElement of priceElements) {
    const priceUnitObj = parsePriceAndUnit(priceElement);
    if (priceUnitObj) product.prices.push(priceUnitObj);
  }
  return product as ProductInterface;
};

export const extractPrices = (
  row: Element
): { price: number; unit: string }[] => {
  let prices = [];

  const priceElements = Array.from(
    row.querySelectorAll(".net-price .aui-label")
  ) as HTMLElement[];

  for (const priceElement of priceElements) {
    const priceUnitObj = parsePriceAndUnit(priceElement);
    if (priceUnitObj) prices.push(priceUnitObj);
  }

  return prices;
};

const disableButton = (button: Element) => {
  button.classList.remove("pointer-cursor");
  button.classList.add("pointer-events-none", "opacity-50", "cursor-wait");
};

export const enableButton = (button: Element): void => {
  button.classList.remove("pointer-events-none", "opacity-50", "cursor-wait");
};

export const addProfitSeaColumn = (dataHeader: Element) => {
  const newCol = document.createElement("div");
  newCol.className = "col data-grid-col last-ordered-col profitsea-col"; // Add relevant classes
  newCol.innerText = "ProfitSea";

  // Get the first column
  const firstCol = dataHeader.children[0];

  // Insert the new column after the first column
  firstCol.after(newCol);
};

export const AddBtnOnClick = async (card: Element) => {
  const button = card.querySelector(".sysco-button-div") as HTMLDivElement;
  disableButton(button!);

  try {
    const product = scrapProductDetails(card);
    await addProductIntoList(product);
    disableButtonWithCustomText(button!, "Added To ProfitSea");
  } catch (error) {
    enableButton(button!);
    console.error("Error adding product:", error);
    alert("Failed to add product.");
  }
};
export const updateBtnOnClick = async (card: Element) => {
  const button = card.querySelector(".sysco-button-div") as HTMLDivElement;
  disableButton(button!);

  try {
    const productNumber = getProductNumberFromCard(card);
    if (!productNumber) {
      alert(`Error scraping productNumber from webpage`);
      console.log(`Error: One of the prices is invalid or missing a unit.`);
      return;
    }
    const prices = extractPrices(card);

    let updatedPrices: ProductInterface["prices"] = [];

    for (const price of prices) {
      if (
        price.price === undefined ||
        isNaN(price.price) ||
        price.unit === undefined ||
        price.unit === ""
      ) {
        alert(`Error scraping details from webpage`);
        console.log(`Error: One of the prices is invalid or missing a unit.`);
        return;
      }
      updatedPrices.push({
        price: price.price,
        unit: price.unit,
      });
    }

    await updateProductPrices(productNumber!, updatedPrices);
    disableButtonWithCustomText(button!, "Product Updated");
  } catch (error) {
    enableButton(button!);
    console.error("Error adding product:", error);
    alert("Failed to add product.");
  }
};

export const createAddOrUpdateBtnDiv = (
  card: Element,
  disable: boolean,
  response: FindListItemResponseType
) => {
  // Create elements
  const divOuter = document.createElement("div");
  const div = document.createElement("div");
  const p = document.createElement("div");
  const img = document.createElement("img");

  // Set common attributes and styles
  img.src = chrome.runtime.getURL("assets/icons/add.png");
  img.alt = "Add to ProfitSea";
  p.className = "bg-transparent text-[0.9rem] text-black";
  divOuter.className =
    "sysco-button-class m-auto md:w-[10%] lg:w-[10%] xl:w-[16%]";
  div.className =
    "sysco-button-div flex flex-row gap-[5px] items-center justify-center cursor-pointer py-[5px] px-[10px]";

  // Set the button's state based on the response
  if (response.isLoggedOut) {
    // If the user is logged out, show Login button
    p.textContent = "Login";
    div.onclick = loginButtonOnClick;
    div.append(p);
  } else if (response.found && response.listItemId) {
    // If the operation was successful, show as Added/Updated and disable
    p.textContent = "Update Product";
    div.onclick = () => updateBtnOnClick(card);
    div.append(p, img);
  } else {
    // Default state, allow adding/updating
    p.textContent = "Add to ProfitSea";
    div.onclick = () => AddBtnOnClick(card);
    // Append elements to div
    div.append(p, img);
  }

  if (disable) {
    // If the button is disabled, show as Added/Updated and disable
    p.textContent = "Added To ProfitSea";
    div.onclick = null;
    div.classList.remove("cursor-pointer");
    div.classList.add("cursor-not-allowed", "opacity-50");
    div.append(p);
  }

  divOuter.append(div);

  return divOuter;
};


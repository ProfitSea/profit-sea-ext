import productsApi from "../../api/productsApi";
import { createNotification } from "../../notification";
import { refreshListBuilderProducts } from "../../utils/actions/messageToSidepanel";

const addProfitSeaColumn = (dataHeader: Element) => {
  const newCol = document.createElement("div");
  newCol.className = "col data-grid-col last-ordered-col profitsea-col"; // Add relevant classes
  newCol.innerText = "ProfitSea";

  // Get the first column
  const firstCol = dataHeader.children[0];

  // Insert the new column after the first column
  firstCol.after(newCol);
};

const createAddBtnDiv = (disable: Boolean) => {
  const div = document.createElement("div");
  div.className = "col last-ordered-col profitsea-add-btn cmROMX label pointer";
  div.role = "presentation";

  const p = document.createElement("p");
  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("assets/icons/add.png");
  img.alt = "add";
  p.innerHTML = "Add";
  p.style.marginRight = "5px";
  p.className = "your-button-class normal-price";

  div.appendChild(p);
  div.appendChild(img);

  if (disable) {
    div.style.opacity = "0.5";
    div.style.cursor = "not-allowed";
  }

  return div;
};

const scrapProductDetails = (row: Element) => {
  // Initializing an empty object for the product
  const product: any = {
    prices: [],
    vendor: "Sysco",
  };

  // Utility function to safely get innerText and trim it
  const getText = (element: HTMLElement | null) =>
    element ? element.innerText.trim() : null;

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

    return { price, unit, quantity: 0 };
  };

  const priceElements = Array.from(
    row.querySelectorAll(".net-price .aui-label")
  ) as HTMLElement[];

  for (const priceElement of priceElements) {
    const priceUnitObj = parsePriceAndUnit(priceElement);
    if (priceUnitObj) product.prices.push(priceUnitObj);
  }
  return product;
};

// Observer for dynamically loaded productContainer
const SyscoBodyObserver = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      const dataHeader = (mutation.target as Element).querySelector(
        ".row.data-grid-row"
      );
      if (dataHeader) {
        if (dataHeader.querySelector(".profitsea-col")) {
          observer.disconnect();
          return;
        }
        addProfitSeaColumn(dataHeader);
        // Disconnect the body observer once we found the container
        observer.disconnect();

        const productsContainer = document.querySelector(".data-grid-body");
        if (productsContainer) {
          initializeProductObserver(productsContainer);
        }
      }
    }
  }
});

// Observer for dynamically loaded products inside the productContainer
const initializeProductObserver = (productsContainer: any) => {
  const productObserver = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        let rows = (mutation.target as Element).querySelectorAll(
          ".data-grid-row"
        );

        rows.forEach((row: Element) => {
          if (row.querySelector(".profitsea-add-btn")) return;
          let disable = false;

          const availabilityLabel = row.querySelector(
            ".availability-indicator-label label"
          );
          if (
            availabilityLabel &&
            availabilityLabel.textContent === "Unavailable"
          ) {
            disable = true;
          }

          const isOutOfStock =
            row.querySelector(
              '.availability-indicator-label label[data-id="product_details_stock_status_label"]'
            )?.textContent === "Out of stock";
          if (isOutOfStock) {
            disable = true;
          }

          const btnDiv = createAddBtnDiv(disable);

          if (!disable) {
            btnDiv.onclick = async () => {
              try {
                const productDetails = scrapProductDetails(row);
                await productsApi.addProduct(productDetails);
                createNotification(
                  "Product Uploaded",
                  "Product uploaded successfully"
                );
                refreshListBuilderProducts();
              } catch (err) {
                console.log(err);
                createNotification(
                  "Product Uploading Failed",
                  "Please contact ProfitSea Admin"
                );
              }
            };
          }

          // Insert the new column (with button) after the first column (drag-col) of the row
          let firstCol = row.querySelector(".drag-col");
          if (!firstCol) return;

          firstCol.insertAdjacentElement("afterend", btnDiv);
        });
      }
    }
  });
  productObserver.observe(productsContainer, {
    childList: true,
    subtree: true,
  });
};

async function onPageLoaded() {
  SyscoBodyObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "sysco_historyUpdated") {
    console.log("Sysco History Updated");
    // Do something when history is updated
    onPageLoaded();
  }
});

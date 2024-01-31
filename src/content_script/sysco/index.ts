import { findListItem } from "../../utils/actions/messageToSidepanel";
import "../index.css";
import { addProfitSeaColumn, createAddOrUpdateBtnDiv, getProductNumberFromCard } from "./sysco.utils";

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
const initializeProductObserver = async (productsContainer: any) => {
  const productObserver = new MutationObserver(
    async (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          let rows = (mutation.target as Element).querySelectorAll(
            ".data-grid-row"
          );

          for (const row of rows) {
            if (row.querySelector(".profitsea-add-btn")) return;
            let firstCol = row.querySelector(".drag-col");
            if (!firstCol) continue;
            const productNumber = getProductNumberFromCard(row);
            if (!productNumber || productNumber.length <= 3) continue;
            // Skip processing if this card is already being processed
            if (row.getAttribute("data-product-number") === productNumber)
              continue;

            // Mark the card with its product number
            row.setAttribute("data-product-number", productNumber);

            // Avoid fetching the state again if it's already being fetched
            if (row.getAttribute("data-fetching-state") === "true") continue;
            row.setAttribute("data-fetching-state", "true");

            // Fetch the state for this card
            const response = await findListItem(productNumber);
            row.removeAttribute("data-fetching-state");

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

            if (
              productsContainer.contains(row) &&
              row.getAttribute("data-product-number") === productNumber
            ) {
              if (firstCol) {
                const existingButton = firstCol.querySelector(
                  ".sysco-button-class"
                );
                if (existingButton) {
                  // Update the existing button if necessary
                  // updateButton(existingButton, response, card);
                } else {
                  // Or append a new button if one does not exist
                  const div = createAddOrUpdateBtnDiv(row, disable, response);
                  firstCol.insertAdjacentElement("afterend", div);
                }
              }
            }
          }
        }
      }
    }
  );
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

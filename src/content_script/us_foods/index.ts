import { findListItem } from "../../utils/actions/messageToSidepanel";
import "../index.css";
import { addProductIntoList } from "../utils";

// Utility functions
const getText = (element: HTMLElement) =>
  element ? element.innerText.trim() : null;

const extractPrices = (card: Element) => {
  const prices = card.querySelectorAll(".price-text");
  return Array.from(prices).map((priceElement) => {
    const priceText = priceElement.textContent?.trim() || "";
    return {
      price: parseFloat(priceText.replace(/[^0-9\.]+/g, "")),
      unit: priceText.split(/\s+/).pop(),
    };
  });
};

const scrapProductDetails: any = (card: Element) => {
  const imgSrc = card
    .querySelector(".product-image-column img")
    ?.getAttribute("src");
  const brand = getText(card.querySelector(".brand-row") as HTMLElement);
  const description = getText(
    card.querySelector(".description-row") as HTMLElement
  );
  const productNumber = getText(
    card.querySelector('[data-cy*="product-number-"]') as HTMLElement
  );
  const packSize = getText(
    card.querySelector('[data-cy*="product-packsize-"]') as HTMLElement
  );
  const prices = extractPrices(card);

  return {
    vendor: "US Foods",
    imgSrc: imgSrc ? imgSrc : null,
    brand,
    description,
    productNumber,
    packSize,
    prices,
  };
};

const getProductNumberFromCard = (card: Element) => {
  const productNumber = getText(
    card.querySelector('[data-cy*="product-number-"]') as HTMLElement
  );
  return productNumber || "0";
};

const createAddBtnDiv = (card: Element) => {
  const div = document.createElement("div");
  div.className =
    "p-1 mt-2 flex flex-row gap-[5px] items-center justify-center cursor-pointer border-[1.5px] border-[#FBBB00] rounded";

  const p = document.createElement("p");
  const img = document.createElement("img");
  img.src = chrome.runtime.getURL("assets/icons/add.png");
  img.alt = "add";
  p.textContent = "Add";
  p.className = "bg-transparent font-semibold your-button-class";
  div.append(p, img);

  div.onclick = async () => {
    const product = scrapProductDetails(card);
    await addProductIntoList(product);
  };

  return div;
};

const createUpdateBtnDiv = (card: Element) => {
  const div = document.createElement("div");
  div.className =
    "p-1 mt-2 flex flex-row gap-[5px] items-center justify-center cursor-pointer border-[1.5px] border-[#FBBB00] rounded";

  const p = document.createElement("p");
  p.textContent = "Update";
  p.className = "bg-transparent font-semibold your-button-class";
  div.append(p);

  div.onclick = async () => {
    const product = scrapProductDetails(card);
    await addProductIntoList(product);
  };

  return div;
};

const observeBody = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.type === "childList") {
      const productContainer = document.querySelector(
        "app-group-product-list-desktop"
      );
      if (productContainer) {
        observeBody.disconnect();
        observeProducts(productContainer);
      }
    }
  }
});

const observeProducts = (container: Element) => {
  let debounceTimer: any;
  const processedCards = new Set(); // Set to keep track of processed cards

  const observer = new MutationObserver((mutations) => {
    if (debounceTimer) clearTimeout(debounceTimer);

    debounceTimer = setTimeout(async () => {
      // Debounce the mutations handling
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          const newCards = Array.from(
            container.querySelectorAll(".card-outline")
          );

          for (const card of newCards) {
            const target = card.querySelector(".order-price-column");
            if (target && !target.querySelector(".your-button-class")) {
              const div = document.createElement("div");
              div.className =
                "mt-2 flex flex-row gap-[3px] items-center justify-center";
              div.append(createAddBtnDiv(card));
              div.append(createUpdateBtnDiv(card));
              target.appendChild(div);
              const productNumber = getProductNumberFromCard(card);

              // Check if card is already processed
              if (
                processedCards.has(card) ||
                (productNumber && productNumber.length <= 3)
              ) {
                continue; // Skip if already processed or if productNumber is not valid
              }
              // Now check for product in backend and log it
              if (productNumber && productNumber.length > 3) {
                const numbersOnly = productNumber.replace(/\D/g, '');
                const product = await findListItem(numbersOnly);
                console.log(numbersOnly, " ", product);
              }

              // Mark this card as processed
              processedCards.add(card);
            }
          }
        }
      }
    }, 500); // Set the debounce time (e.g., 500 milliseconds)
  });

  observer.observe(container, { childList: true, subtree: true });
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === "usfoods_historyUpdated") {
    observeBody.observe(document.body, { childList: true, subtree: true });
  }
});

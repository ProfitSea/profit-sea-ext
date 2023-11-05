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

const createAddBtnDiv = (card: Element) => {
  const div = document.createElement("div");
  div.className =
    "mt-2 flex flex-row gap-[5px] items-center justify-center cursor-pointer";

    const p = document.createElement("p");
    const img = document.createElement("img");
    img.src = chrome.runtime.getURL("assets/icons/add.png");
    img.alt = "add";
    p.textContent = "Add To ProfitSea";
    p.className = "bg-transparent font-semibold your-button-class";
    div.append(p, img);

  const originalContent = div.cloneNode(true); // Save the initial div content

  div.onclick = async () => {
    // Set div content to "Loading..."
    while(div.firstChild) {
      div.removeChild(div.firstChild);
    }
    div.textContent = "Loading...";

    const product = scrapProductDetails(card);
    await addProductIntoList(product);

    // Restore the original div content
    div.replaceWith(originalContent);
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
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        const newCards = Array.from(
          container.querySelectorAll(".card-outline")
        );
        for (const card of newCards) {
          // const outOfStockNotification = card.querySelector(
          //   '.top-drawer > p[data-cy="product-card-top-drawer-text"]'
          // );
          // if (
          //   outOfStockNotification &&
          //   outOfStockNotification.textContent === "Out of Stock"
          // ) {
          //   continue;
          // }

          const target = card.querySelector(".order-price-column");
          if (target && !target.querySelector(".your-button-class")) {
            target.appendChild(createAddBtnDiv(card));
          }
        }
      }
    }
  });
  observer.observe(container, { childList: true, subtree: true });
};

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === "usfoods_historyUpdated") {
    observeBody.observe(document.body, { childList: true, subtree: true });
  }
});

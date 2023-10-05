import "../index.css";

const scrapProductDetails = (card: Element) => {
  const productImageDiv = card.querySelector(".product-image-column");
  if (!productImageDiv) return;
  // Query for the image element within that div
  const productImageElement = productImageDiv.querySelector("img");
  // Get the image source URL
  const imgSrc = productImageElement?.getAttribute("src") || null;
  const brand = card.querySelector(".brand-row")?.textContent?.trim() || null;
  const description =
    card.querySelector(".description-row")?.textContent?.trim() || null;
  const productNumber =
    card.querySelector('[data-cy*="product-number-"]')?.textContent?.trim() ||
    null;
  const packSize =
    card.querySelector('[data-cy*="product-packsize-"]')?.textContent?.trim() ||
    null;
  const prices = card.querySelectorAll(".price-text");
  const priceDetails = [] as any;

  for (const priceElement of prices) {
    if (!priceElement || !priceElement.textContent) return;
    const priceText = priceElement.textContent.trim();
    const unit = priceText.split(/\s+/).pop();
    const price = Number(priceText.replace(/[^0-9\.]+/g, ""));

    priceDetails.push({
      price: price,
      unit: unit,
    });
  }

  return {
    vendor: "US Foods",
    imgSrc,
    brand,
    description,
    productNumber,
    packSize,
    prices: priceDetails,
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
  p.innerHTML = "Add To ProfitSea";
  p.className = "bg-transparent font-semibold your-button-class";
  div.appendChild(p);
  div.appendChild(img);
  div.onclick = () => {
    const product = scrapProductDetails(card);
    chrome.runtime.sendMessage({
      action: "recieve_New_Product",
      payload: product,
    });
  };
  return div;
};

// Observer for dynamically loaded productContainer
const UsFoodsBodyObserver = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      const productContainer = document.querySelector(
        "app-group-product-list-desktop"
      );
      if (productContainer) {
        // Disconnect the body observer once we found the container
        observer.disconnect();
        // Initialize product observer
        initializeProductObserver(productContainer);
      }
    }
  }
});

// Observer for dynamically loaded products inside the productContainer
const initializeProductObserver = (productContainer: any) => {
  const productObserver = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const newCards = (mutation.target as Element).querySelectorAll(
          ".card-outline"
        );
        for (const card of newCards) {
          const ellipsisElement = card.querySelector(".order-price-column");
          if (!ellipsisElement || !ellipsisElement.parentNode) return;

          const existingButton =
            ellipsisElement.parentNode.querySelector(".your-button-class");
          if (existingButton) return;

          const btnDiv = createAddBtnDiv(card);
          ellipsisElement.appendChild(btnDiv);
        }
      }
    }
  });
  productObserver.observe(productContainer, { childList: true, subtree: true });
};

function onPageLoaded() {
  UsFoodsBodyObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "usfoods_historyUpdated") {
    // Do something when history is updated
    onPageLoaded();
  }
});

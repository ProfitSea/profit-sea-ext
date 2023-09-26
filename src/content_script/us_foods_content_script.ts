import "./index.css";

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
        newCards.forEach((card: Element) => {
          const ellipsisElement = card.querySelector(".order-price-column");
          if (!ellipsisElement) return;
          if (!ellipsisElement.parentNode) return;
          const existingButton =
            ellipsisElement.parentNode.querySelector(".your-button-class");
          if (existingButton) return;

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
            const productImageDiv = card.querySelector(".product-image-column");
            if (!productImageDiv) return;
            // Query for the image element within that div
            const productImageElement = productImageDiv.querySelector("img");
            // Get the image source URL
            const imgSrc = productImageElement?.getAttribute("src") || null;
            const brand =
              card.querySelector(".brand-row")?.textContent?.trim() || null;
            const description =
              card.querySelector(".description-row")?.textContent?.trim() ||
              null;
            const productNumber =
              card
                .querySelector('[data-cy*="product-number-"]')
                ?.textContent?.trim() || null;
            const packSize =
              card
                .querySelector('[data-cy*="product-packsize-"]')
                ?.textContent?.trim() || null;
            let prices = card.querySelectorAll(".price-text");
            let priceDetails = [] as any;

            prices.forEach((priceElement) => {
              if (!priceElement || !priceElement.textContent) return;
              let priceText = priceElement.textContent.trim();
              let unit = priceText.split(/\s+/).pop();
              let price = Number(priceText.replace(/[^0-9\.]+/g, ""));

              priceDetails.push({
                price: price,
                unit: unit,
              });
            });

            const lineNumber =
              card
                .querySelector(
                  '[data-cy="product-card-line-number-text-non-edit"]'
                )
                ?.textContent?.trim() || null;

            const product = {
              vendor: "US Foods",
              imgSrc,
              brand,
              description,
              productNumber,
              packSize,
              prices: priceDetails,
              lineNumber,
            };
            chrome.runtime.sendMessage({
              action: "recieve_New_Product",
              payload: product,
            });
          };

          ellipsisElement.appendChild(div);
        });
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
  if (request.action === "historyUpdated") {
    // Do something when history is updated
    onPageLoaded();
  }
});

import { findListItem } from "../../utils/actions/messageToSidepanel";
import { MessagingActions } from "../../utils/actions/messagingActions.enum";
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

const createAddOrUpdateBtnDiv = (
  card: Element,
  response: {
    found: boolean;
    message?: string;
    isLoggedOut?: boolean;
  }
) => {
  // Create elements
  const div = document.createElement("div");
  const p = document.createElement("p");
  const img = document.createElement("img");

  // Set common attributes and styles
  img.src = chrome.runtime.getURL("assets/icons/add.png");
  img.alt = "Add";
  p.className = "bg-transparent font-semibold your-button-class";
  div.className =
    "your-button-class p-2 mt-2 flex flex-row gap-[5px] items-center justify-center border-[1.5px] border-[#FBBB00] rounded cursor-pointer";

  // Set the button's state based on the response
  if (response.isLoggedOut) {
    // If the user is logged out, show Login button
    p.textContent = "Login";
    div.onclick = async () => {
      chrome.runtime.sendMessage({
        action: MessagingActions.OPEN_API_KEY_VERIFICATOIN_PAGE,
      });
    };
    div.append(p);
  } else if (response.found) {
    // If the operation was successful, show as Added/Updated and disable
    p.textContent = "Update";
    div.onclick = async () => {
      const product = scrapProductDetails(card);
      await addProductIntoList(product);
      // p.textContent = "Added"; // Update text after click
      // div.classList.add("opacity-50", "cursor-not-allowed"); // Disable after adding
    };
    div.append(p);
  } else {
    // Default state, allow adding/updating
    p.textContent = "Add";
    div.onclick = async () => {
      const product = scrapProductDetails(card);
      await addProductIntoList(product);
      // p.textContent = "Added"; // Update text after click
      // div.classList.add("opacity-50", "cursor-not-allowed"); // Disable after adding
    };
    // Append elements to div
    div.append(p, img);
  }

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
    mutations.forEach(async (mutation) => {
      if (mutation.type === "childList") {
        const cards = Array.from(container.querySelectorAll(".card-outline"));

        for (const card of cards) {
          // Using the product number as a unique key to manage state
          const productNumber = getProductNumberFromCard(card);
          if (!productNumber || productNumber.length <= 3) continue;

          // Skip processing if this card is already being processed
          if (card.getAttribute("data-product-number") === productNumber)
            continue;

          // Mark the card with its product number
          card.setAttribute("data-product-number", productNumber);

          // Avoid fetching the state again if it's already being fetched
          if (card.getAttribute("data-fetching-state") === "true") continue;
          card.setAttribute("data-fetching-state", "true");

          // Fetch the state for this card
          const response = await findListItem(productNumber.replace(/\D/g, ""));
          card.removeAttribute("data-fetching-state");

          // After the state is fetched, check if the card is still in the DOM
          if (
            container.contains(card) &&
            card.getAttribute("data-product-number") === productNumber
          ) {
            const target = card.querySelector(".order-price-column");
            if (target) {
              const existingButton = target.querySelector(".your-button-class");
              if (existingButton) {
                // Update the existing button if necessary
                updateButton(existingButton, response);
              } else {
                // Or append a new button if one does not exist
                const div = createAddOrUpdateBtnDiv(card, response);
                target.appendChild(div);
              }
            }
          }
        }
      }
    });
  });

  observer.observe(container, { childList: true, subtree: true });
};

function updateButton(
  button: Element,
  response: {
    found: boolean;
    message?: string;
    isLoggedOut?: boolean;
  }
) {
  // Assume button is the <div> containing <p> and possibly <img>
  const p = button.querySelector("p") || document.createElement("p");
  const img = button.querySelector("img") || document.createElement("img");

  // Reset event handlers by cloning the button
  const newButton = button.cloneNode(false) as HTMLElement;
  button?.parentNode?.replaceChild(newButton, button);

  // Update the button's state based on the response
  if (response.isLoggedOut) {
    p.textContent = "Login";
    newButton.onclick = async () => {
      chrome.runtime.sendMessage({
        action: MessagingActions.OPEN_API_KEY_VERIFICATOIN_PAGE,
      });
    };
    newButton.append(p);
  } else if (response.found) {
    p.textContent = "Update";
    newButton.onclick = async () => {
      // Assuming scrapProductDetails and addProductIntoList are defined elsewhere
      const product = scrapProductDetails(newButton);
      await addProductIntoList(product);
    };
    newButton.append(p);
  } else {
    p.textContent = "Add";

    img.src = chrome.runtime.getURL("assets/icons/add.png");
    img.alt = "Add";

    newButton.onclick = async () => {
      const product = scrapProductDetails(newButton);
      await addProductIntoList(product);
    };
    newButton.append(p, img);
  }
}

// Your existing utility functions...

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.action === "usfoods_historyUpdated") {
    observeBody.observe(document.body, { childList: true });
  }
});

import "./index.css";
import UsFoodsBodyObserver from "./vendors/us-vendor";

// Start observing the document body to find the dynamically loaded productContainer
UsFoodsBodyObserver.observe(document.body, { childList: true, subtree: true });

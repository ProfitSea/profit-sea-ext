export enum Pages {
  LIST_BUILDER = "listBuilder",
  PRODUCTS_TYPE = "productsType",
  COMPARE = "compare",
  PRODUCTS_ANALYSIS = "productsAnalysis",
  PURCHASE_LIST = "puchaseList",
}

interface ButtonData {
  title: string;
  navigateTo: Pages; // Specify that it's either a Page or an empty string.
}

export const buttonsData: Record<Pages, ButtonData> = {
  [Pages.LIST_BUILDER]: {
    title: "Continue to Product Type",
    navigateTo: Pages.PRODUCTS_TYPE,
  },
  [Pages.PRODUCTS_TYPE]: {
    title: "Continue to Comparison",
    navigateTo: Pages.PRODUCTS_ANALYSIS,
  },
  [Pages.COMPARE]: {
    title: "Continue to Analysis",
    navigateTo: Pages.COMPARE,
  },
  [Pages.PRODUCTS_ANALYSIS]: {
    title: "Generate or Update Purchase List",
    navigateTo: Pages.PURCHASE_LIST,
  },

  [Pages.PURCHASE_LIST]: {
    title: "Create Order",
    navigateTo: Pages.PRODUCTS_ANALYSIS,
  },
};

export const breadcrumbsData = [
  {
    label: "List Builder",
    pageName: Pages.LIST_BUILDER,
  },
  {
    label: "Product Type",
    pageName: Pages.PRODUCTS_TYPE,
  },
  {
    label: "Compare",
    pageName: Pages.COMPARE,
  },
  {
    label: "Product Analysis",
    pageName: Pages.PRODUCTS_ANALYSIS,
  },
  {
    label: "Purchase List",
    pageName: Pages.PURCHASE_LIST,
  },
];

export const pageToActiveIndex: Record<Pages, number> = {
  [Pages.LIST_BUILDER]: 0,
  [Pages.PRODUCTS_TYPE]: 1,
  [Pages.COMPARE]: 2,
  [Pages.PRODUCTS_ANALYSIS]: 3,
  [Pages.PURCHASE_LIST]: 4,
};

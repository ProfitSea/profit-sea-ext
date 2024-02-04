export enum Pages {
  LIST_BUILDER = "listBuilder",
  PRODUCTS_TYPE = "productsType",
  PRODUCTS_ANALYSIS = "productsAnalysis",
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
    title: "Continue to Analysis",
    navigateTo: Pages.PRODUCTS_ANALYSIS,
  },
  [Pages.PRODUCTS_ANALYSIS]: {
    title: "Accept and Create Order",
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
    pageName: Pages.PRODUCTS_TYPE,
  },
  {
    label: "Product Analysis",
    pageName: Pages.PRODUCTS_ANALYSIS,
  },
];

export const pageToActiveIndex: Record<Pages, number> = {
  [Pages.LIST_BUILDER]: 0,
  [Pages.PRODUCTS_TYPE]: 1,
  [Pages.PRODUCTS_ANALYSIS]: 2,
};

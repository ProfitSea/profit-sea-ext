export interface PriceInterface {
  active: boolean;
  productSaleUnit: string;
  price: number;
  listItem: string;
  user: string;
  id: string;
}

export interface SaleUnitInterface {
  unit: string;
  product: string;
  id: string;
}

export interface SaleUnitQuantityInterface {
  quantity: number;
  _id: string;
  saleUnit: SaleUnitInterface;
  price: PriceInterface;
}

export interface RecommendationInterface {
  priceSavings: string | null;
  reason: string | null;
  listItemId: string;
}

export interface ProductInterface {
  saleUnits: string[];
  vendor: Vendor;
  imgSrc: string; // Updated to reflect nullable field
  brand: string;
  description: string;
  productNumber: string;
  packSize: string;
  category: string; // New field added
  id: string;
}

export interface ListItemInterface {
  recommendation?: RecommendationInterface; // New optional field
  isBaseProduct: boolean; // New field added
  comparisonProducts: ListItemInterface[]; // New field added for nested comparison products
  totalPrice: number; // Corrected type from Number to number for consistency
  isAnchored: boolean;
  user: string;
  list: string;
  product: ProductInterface;
  saleUnitQuantities: SaleUnitQuantityInterface[];
  vendor: Vendor;
  id: string;
}
export interface ListInterface {
  name: string;
  listItems: ListItemInterface[];
  itemsCount: number;
  user: string;
  id: string;
}

export interface RootObject {
  list: ListInterface;
}

export interface Vendor {
  name: string;
  id: string;
}

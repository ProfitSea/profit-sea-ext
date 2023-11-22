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

export interface ProductInterface {
  saleUnits: string[]; // This seems to be an array of string IDs now
  vendor: string;
  imgSrc: string;
  brand: string;
  description: string;
  productNumber: string;
  packSize: string;
  id: string;
}

export interface ListItemInterface {
  user: string;
  list: string;
  product: ProductInterface;
  saleUnitQuantities: SaleUnitQuantityInterface[];
  vendor: string; // This field seems new
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

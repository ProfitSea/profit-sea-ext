export interface PriceInterface {
  active: boolean;
  product: string;
  productSaleUnit: string;
  price: number;
  id: string;
}

export interface SaleUnitInterface {
  unit: string;
  product: string;
  price: PriceInterface;
  id: string;
}

export interface SaleUnitQuantityInterface {
  quantity: number;
  _id: string;
  saleUnit: string;
}

export interface ProductInterface {
  saleUnits: SaleUnitInterface[];
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

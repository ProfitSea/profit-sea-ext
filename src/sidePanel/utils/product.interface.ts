interface Price {
  price: number;
  unit: string;
}

interface ProductInterface {
  vendor: string;
  imgSrc: string;
  brand: string;
  description: string;
  productNumber: string;
  packSize: string;
  prices: Price[];
  quantity: number | 0;
}

export default ProductInterface;

import ProductInterface from "../utils/product.interface";
import { FilterProductsType } from "../utils/types/FilterProducts.type";
import API, { toQueryString } from "./api";

const routes = {
  create: "v1/products",
  get: "v1/products",
};

class ProductsApi {
  async addProduct(product: ProductInterface) {
    try {
      const request = await API.post(routes.create, product);
      return request;
    } catch (error) {
      console.log(error);
      debugger;
    }
  }

  async getProducts(filterProducts: FilterProductsType) {
    try {
      const queryString = toQueryString(filterProducts);
      const request = await API.get(`${routes.get}?${queryString}`);
      return request.data;
    } catch (error) {
      console.log(error);
      debugger;
    }
  }
}
export default new ProductsApi();

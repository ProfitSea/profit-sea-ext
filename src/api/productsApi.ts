import ProductInterface from "../utils/product.interface";
import { FilterProductsType } from "../utils/types/FilterProducts.type";
import API, { toQueryString } from "./api";

const routes = {
  create: "v1/products",
  get: "v1/products",
  update: "v1/products",
};

class ProductsApi {
  async addProduct(product: ProductInterface) {
    try {
      const request = await API.post(routes.create, product);
      return request;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProducts(filterProducts: FilterProductsType) {
    try {
      const queryString = toQueryString({ ...filterProducts, limit: 100 });
      const request = await API.get(`${routes.get}?${queryString}`);
      return request.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateProduct(productId: string, product: Partial<ProductInterface>) {
    try {
      const request = await API.patch(`${routes.update}/${productId}`, product);
      return request;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProduct(productId: string) {
    try {
      const request = await API.delete(`${routes.update}/${productId}`);
      return request;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default new ProductsApi();

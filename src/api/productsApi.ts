import ProductInterface from "../utils/product.interface";
import API from "./api";

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

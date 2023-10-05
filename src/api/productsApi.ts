import ProductInterface from "../utils/product.interface";
import API from "./api";

const routes = {
  create: "v1/products",
};

class ProductsApi {
  async addProduct(product: ProductInterface) {
    try {
      const request = await API.post(routes.create, product);
      console.log("Request Response: ", request);
      debugger;
      return request;
    } catch (error) {
      console.log(error);
      debugger;
    }
  }
}
export default new ProductsApi();

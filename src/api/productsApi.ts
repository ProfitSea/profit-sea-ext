import API from "./api";

const routes = {
  create: "v1/products",
};

class ProductsApi {
  async addProduct() {
    try {
      const request = await API.get(routes.create);
      debugger;
      return request;
    } catch (error) {
      debugger;
    }
  }
}
export default new ProductsApi();

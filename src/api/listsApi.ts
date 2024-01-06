import ProductInterface from "../utils/product.interface";
import API, { appName, toQueryString } from "./api";

const listRoutes = {
  create: "v1/lists",
  updateListName: "v1/lists",
  get: "v1/lists",
  update: "v1/lists",
  addListItem: "v1/lists",
  deleteListItem: "v1/lists",
  getListById: "v1/lists",
  updateListItemQuantity: "v1/list-items/quantity",
  getListItem: "v1/list-items",
};

class ListsApi {
  async createList() {
    try {
      const request = await API.post(listRoutes.create);
      return request.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateListName(listId: string, name: string) {
    try {
      await API.patch(`${listRoutes.updateListName}/${listId}/name`, {
        name,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getLists() {
    try {
      const queryString = toQueryString({ limit: 100 });
      const request = await API.get(`${listRoutes.get}?${queryString}`);
      return request.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async addListItem(listId: string, payload: { product: ProductInterface }) {
    try {
      const request = await API.post(
        `${listRoutes.addListItem}/${listId}/list-item`,
        payload
      );
      return request.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteListItem(listId: string, listItemId: string) {
    try {
      await API.delete(
        `${listRoutes.deleteListItem}/${listId}/list-item/${listItemId}`
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getListById(listId: string) {
    try {
      const request = await API.get(`${listRoutes.getListById}/${listId}`);
      return request.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getListItemsByListId(listId: string) {
    try {
      const request = await API.get(`${listRoutes.getListById}/${listId}`);
      return request.data.list.listItems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateListItemQuantity(payload: {
    listItemId: string;
    saleUnitId: string;
    quantity: number;
  }) {
    try {
      await API.patch(`${listRoutes.updateListItemQuantity}`, payload);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // async getListItemByProductNumber(productNumber: string) {
  //   try {
  //     const queryString = toQueryString({ productNumber });
  //     console.log("Query String", queryString);
  //     const request = await API.get(`${listRoutes.getListItem}?${queryString}`);
  //     console.log("Request", request);
  //     return request.data;
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // }

  async getListItemByProductNumber(productNumber: string) {
    try {
      const queryString = toQueryString({ productNumber });
      const apiToken = await chrome.storage.local.get(`${appName}_token`);
      const request = await fetch(
        `${API.defaults.baseURL}/${listRoutes.getListItem}?${queryString}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiToken.profit_sea_token}`,
          },
        }
      );
      const response = await request.json();
      if (response.code === 401) {
        return {
          found: false,
          message: "Sorry, Please login again",
          isLoggedOut: true,
        };
      }
      if (response.listItem) {
        return {
          found: true,
          message: "Product found in list",
        };
      }
      return {
        found: false,
        message: "Product not found in any list",
      };
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
export default new ListsApi();

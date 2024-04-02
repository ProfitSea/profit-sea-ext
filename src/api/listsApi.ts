import ChromeLocalStorage from "../utils/StorageFunctions/localStorage.function";
import ProductInterface from "../utils/product.interface";
import { FindListItemResponseType } from "../utils/types/FindListItemByProductNumber.type";
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

  async getListItemByProductNumber(
    productNumber: string
  ): Promise<FindListItemResponseType> {
    // fetch because axios is not working in background script
    try {
      const queryString = toQueryString({ productNumber });
      const [apiToken, { profitsea_current_list: currentList }] =
        await Promise.all([
          ChromeLocalStorage.getAccessToken(),
          ChromeLocalStorage.getCurrentList(),
        ]);

      if (!apiToken?.profit_sea_token) {
        return {
          found: false,
          message: "Sorry, Please login again",
          isLoggedOut: true,
        };
      }

      if (!currentList?.listItems?.length)
        return {
          found: false,
          message: "No list items found",
          isLoggedOut: false,
          error: false,
        };

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

      return this.findListItemInAPIAndInCurrentList(
        response.listItems,
        currentList
      );
    } catch (error) {
      console.log(error);
      return {
        found: false,
        error: true,
        message: "Request Failed, Please contact Admin",
        isLoggedOut: false,
      };
    }
  }

  async updatePricesByProductNumber(
    productNumber: ProductInterface["productNumber"],
    prices: ProductInterface["prices"]
  ) {
    try {
      const queryString = toQueryString({ productNumber });
      const response = await API.patch(
        `${listRoutes.getListItem}?${queryString}`,
        { prices }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  private findListItemInAPIAndInCurrentList = async (
    listItems: string[],
    currentList: any
  ) => {
    const response = {
      isLoggedOut: false,
      found: listItems?.length > 0,
      listItemId: undefined,
    } as FindListItemResponseType;
    try {
      if (currentList?.listItems?.length > 0 && listItems?.length > 0) {
        listItems.find((listItem: string) => {
          const foundItem = currentList.listItems.find(
            (item: string) => item === listItem
          );

          if (foundItem) {
            response.listItemId = foundItem;
          }
        });
      }
    } catch (error) {
      console.log(error);
    }

    return response;
  };

  async getListsAnalysis(listId: string) {
    try {
      const request = await API.get(`v1/lists/${listId}/analysis`);
      return request.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default new ListsApi();

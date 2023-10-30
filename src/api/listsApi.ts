import API, { toQueryString } from "./api";

const listRoutes = {
  create: "v1/lists",
  updateListName: "v1/lists/name",
  get: "v1/lists",
  update: "v1/lists",
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
      const request = await API.patch(`${listRoutes.updateListName}/${listId}`, {
        name,
      });
      return request.data;
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
}
export default new ListsApi();

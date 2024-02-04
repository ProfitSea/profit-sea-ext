import API from "./api";

const listItemRoutes = {
  toggleListItemAnchor: "v1/list-items/toggle-anchor",
};

class ListItemsApi {
  async toggleListItemAnchor(listItemId: string) {
    try {
      const request = await API.patch(
        `${listItemRoutes.toggleListItemAnchor}/${listItemId}`
      );
      return request.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default new ListItemsApi();

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

  async removeComparisonListItem(baseListItemId: string, comparisonListItemId: string) {
    try {
      debugger;
      const request = await API.post(
        `v1/list-items/${baseListItemId}/remove-comparison-product/${comparisonListItemId}`
      );
      debugger;
      return request.data;
    } catch (error) {
      debugger;
      console.log(error);
      throw error;
    }
  }
}
export default new ListItemsApi();

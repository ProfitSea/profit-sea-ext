import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListItemInterface } from "../../../utils/types/product-response.type";
import { RootState } from "../store";

interface ListsState {
  lists: any[];
  listItems: ListItemInterface[];
  loading: boolean;
}

const initialState: ListsState = {
  lists: [],
  listItems: [],
  loading: false,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setLists(state, action: PayloadAction<any[]>) {
      debugger;
      state.lists = action.payload;
    },
    setListItems(state, action: PayloadAction<any[]>) {
      state.listItems = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateListName(state, action: PayloadAction<{ listId: string; name: string }>) {
      const { listId, name } = action.payload;
      const list = state.lists.find((list) => list.id === listId);
      if (list) {
        list.name = name;
      }
    },
    removeListItem(
      state,
      action: PayloadAction<{ listId: string; listItemId: string }>
    ) {
      const { listId, listItemId } = action.payload;
      const listIndex = state.lists.findIndex((list) => list.id === listId);
      if (listIndex !== -1) {
        const listItemIndex = state.listItems.findIndex(
          (listItem: ListItemInterface) => listItem.id === listItemId
        );
        state.listItems.splice(listItemIndex, 1);
        state.lists[listIndex].itemsCount =
          state.lists[listIndex].itemsCount - 1;
      }
    },
    updateListItemQuantity(
      state,
      action: PayloadAction<{
        listItemId: string;
        saleUnitQuantityId: string;
        quantity: number;
      }>
    ) {
      const { listItemId, saleUnitQuantityId, quantity } = action.payload;
      const listItemIndex = state.listItems.findIndex(
        (listItem: ListItemInterface) => listItem.id === listItemId
      );
      if (listItemIndex !== -1) {
        const saleUnitQuantityIndex = state.listItems[
          listItemIndex
        ].saleUnitQuantities.findIndex(
          (saleUnitQuantity) => saleUnitQuantity._id === saleUnitQuantityId
        );
        if (saleUnitQuantityIndex !== -1)
          state.listItems[listItemIndex].saleUnitQuantities[
            saleUnitQuantityIndex
          ].quantity = quantity;
      }
    },
  },
});

// Select the lists domain from the state
const selectListsDomain = (state: RootState) => state.lists;

// Create each selector using Reselect
export const listsSelector = createSelector(
  selectListsDomain,
  (listsState) => listsState.lists
);

export const listItemsSelector = createSelector(
  selectListsDomain,
  (listsState) => listsState.listItems
);

export const listsLoadingSelector = createSelector(
  selectListsDomain,
  (listsState) => listsState.loading
);

export const {
  setLists,
  setListItems,
  setLoading,
  updateListName,
  removeListItem,
  updateListItemQuantity,
} = listsSlice.actions;

export default listsSlice.reducer;

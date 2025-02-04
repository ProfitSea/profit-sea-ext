import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ListInterface,
  ListItemInterface,
} from "../../../utils/types/product-response.type";
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
      state.lists = action.payload;
    },
    setListItems(state, action: PayloadAction<any[]>) {
      state.listItems = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateListName(
      state,
      action: PayloadAction<{ listId: string; name: string }>
    ) {
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
        const listItem = state.listItems[listItemIndex];
        const saleUnitQuantityIndex = listItem.saleUnitQuantities.findIndex(
          (saleUnitQuantity) => saleUnitQuantity._id === saleUnitQuantityId
        );
        if (saleUnitQuantityIndex !== -1) {
          listItem.saleUnitQuantities[saleUnitQuantityIndex].quantity =
            quantity;

          // Calculate the new total price
          let newTotalPrice = 0;
          listItem.saleUnitQuantities.forEach((suq) => {
            newTotalPrice += suq.quantity * (suq.price.price || 0);
          });

          // Update the total price
          listItem.totalPrice = Math.round(newTotalPrice * 100) / 100;
        }
      }
    },
    pushListItem(
      state,
      action: PayloadAction<{
        listId: string;
        listItem: ListItemInterface;
      }>
    ) {
      const { listId, listItem } = action.payload;
      const listIndex = state.lists.findIndex((list) => list.id === listId);
      if (listIndex !== -1) {
        state.lists[listIndex].itemsCount =
          state.lists[listIndex].itemsCount + 1;
        state.lists[listIndex].listItems.push(listItem.id);
        state.listItems.unshift(listItem);
      }
    },
    addListAndListItem(
      state,
      action: PayloadAction<{
        list: ListInterface;
        listItem: ListItemInterface;
      }>
    ) {
      const { list, listItem } = action.payload;
      state.lists.unshift(list);
      state.listItems = [listItem];
    },
    addComparisonListItem(
      state,
      action: PayloadAction<{
        baseListItemId: string;
        comparisonListItemId: string;
      }>
    ) {
      const { baseListItemId, comparisonListItemId } = action.payload;
      const baseListItemIndex = state.listItems.findIndex(
        (listItem: ListItemInterface) => listItem.id === baseListItemId
      );
      if (baseListItemIndex !== -1) {
        const comparisonListItemIndex = state.listItems.findIndex(
          (listItem: ListItemInterface) => listItem.id === comparisonListItemId
        );
        if (comparisonListItemIndex !== -1) {
          state.listItems[baseListItemIndex].comparisonProducts.push(
            state.listItems[comparisonListItemIndex]
          );
        }
      }
    },
    removeComparisonListItem(
      state,
      action: PayloadAction<{
        baseListItemId: string;
        comparisonListItemId: string;
      }>
    ) {
      const { baseListItemId, comparisonListItemId } = action.payload;
      const baseListItemIndex = state.listItems.findIndex(
        (listItem: ListItemInterface) => listItem.id === baseListItemId
      );
      if (baseListItemIndex !== -1) {
        const comparisonListItemIndex = state.listItems[
          baseListItemIndex
        ].comparisonProducts.findIndex(
          (listItem: ListItemInterface) => listItem.id === comparisonListItemId
        );
        if (comparisonListItemIndex !== -1) {
          state.listItems[baseListItemIndex].comparisonProducts.splice(
            comparisonListItemIndex,
            1
          );
        }
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
  pushListItem,
  addListAndListItem,
  addComparisonListItem,
  removeComparisonListItem,
} = listsSlice.actions;

export default listsSlice.reducer;

import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ListsState {
  lists: any[];
  loading: boolean;
}

const initialState: ListsState = {
  lists: [],
  loading: false,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setLists(state, action: PayloadAction<any[]>) {
      state.lists = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateListName(
      state,
      action: PayloadAction<{ listId: string; name: string }>
    ) {
      const { listId, name } = action.payload;
      const listIndex = state.lists.findIndex((list) => list.id === listId);
      state.lists[listIndex].name = name;
    },
    updateListItemCount(
      state,
      action: PayloadAction<{
        listId: string;
      }>
    ) {
      const { listId } = action.payload;
      const listIndex = state.lists.findIndex((list) => list.id === listId);
      if (listIndex !== -1)
        state.lists[listIndex].itemsCount =
          state.lists[listIndex].itemsCount - 1;
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

export const listsLoadingSelector = createSelector(
  selectListsDomain,
  (listsState) => listsState.loading
);

export const { setLists, setLoading, updateListName, updateListItemCount } =
  listsSlice.actions;

export default listsSlice.reducer;

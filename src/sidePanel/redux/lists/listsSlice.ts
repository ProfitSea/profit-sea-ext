import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ListsState {
  lists: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ListsState = {
  lists: [],
  loading: false,
  error: null,
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
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    updateListName(
      state,
      action: PayloadAction<{ listId: string; name: string }>
    ) {
      const { listId, name } = action.payload;
      const listIndex = state.lists.findIndex((list) => list.id === listId);
      state.lists[listIndex].name = name;
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

export const listsErrorSelector = createSelector(
  selectListsDomain,
  (listsState) => listsState.error
);
export const { setLists, setLoading, updateListName, setError } = listsSlice.actions;

export default listsSlice.reducer;

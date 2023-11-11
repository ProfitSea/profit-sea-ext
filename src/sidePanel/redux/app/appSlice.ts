import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AppState {
  currentList: any;
  selectValue: string;
}

const initialState: AppState = {
  currentList: {},
  selectValue: "0",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentList(state, action: PayloadAction<any>) {
      state.currentList = action.payload;
    },
    resetCurrentList(state) {
      state.currentList = {};
    },
    setSelectValue(state, action: PayloadAction<string>) {
      state.selectValue = action.payload;
    },
    updateCurrentListName(state, action: PayloadAction<string>) {
      state.currentList.name = action.payload;
    },
  },
});

// Using Reselect to create memoized selectors
const selectAppDomain = (state: RootState) => state.app;

export const currentListSelector = createSelector(
  selectAppDomain,
  (currentListState) => currentListState.currentList
);

export const selectValueSelector = createSelector(
  selectAppDomain,
  (currentListState) => currentListState.selectValue
);

export const {
  setCurrentList,
  resetCurrentList,
  setSelectValue,
  updateCurrentListName,
} = appSlice.actions;

export default appSlice.reducer;

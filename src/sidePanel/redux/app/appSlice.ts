import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { vendorsTagsData } from "../../../utils/data/vendorTags.data";
import { ListInterface } from "../../../utils/types/product-response.type";

interface AppState {
  currentList: ListInterface;
  selectValue: string;
  vendorFilter: string;
  vendorTags: TagType[];
  error: string;
}

const initialState: AppState = {
  currentList: {} as ListInterface,
  selectValue: "0",
  vendorFilter: "all",
  vendorTags: vendorsTagsData,
  error: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentList(state, action: PayloadAction<any>) {
      state.currentList = action.payload;
    },
    resetCurrentList(state) {
      state.currentList = {} as ListInterface;
    },
    setSelectValue(state, action: PayloadAction<string>) {
      state.selectValue = action.payload;
    },
    updateCurrentListName(state, action: PayloadAction<string>) {
      state.currentList.name = action.payload;
    },
    setVendorFilter(state, action: PayloadAction<string>) {
      state.vendorFilter = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setVendorTagsCount(
      state,
      action: PayloadAction<{ vendorName: string; count: number }>
    ) {
      const { vendorName, count } = action.payload;
      const tagIndex = state.vendorTags.findIndex(
        (tag) => tag.filterValue === vendorName
      );
      if (tagIndex !== -1) {
        state.vendorTags[tagIndex].count = count;
      }
    },
    updateVendorTags(state, action: PayloadAction<TagType[]>) {
      state.vendorTags = action.payload;
    },
    resetVendorTagsCount(state) {
      state.vendorFilter = "all";
      state.vendorTags = vendorsTagsData;
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

export const vendorFilterSelector = createSelector(
  selectAppDomain,
  (currentListState) => currentListState.vendorFilter
);

export const vendorTagsSelector = createSelector(
  selectAppDomain,
  (currentListState) => currentListState.vendorTags
);

export const errorSelector = createSelector(
  selectAppDomain,
  (currentListState) => currentListState.error
);

export const {
  setCurrentList,
  resetCurrentList,
  setSelectValue,
  updateCurrentListName,
  setVendorFilter,
  setVendorTagsCount,
  updateVendorTags,
  resetVendorTagsCount,
  setError,
} = appSlice.actions;

export default appSlice.reducer;

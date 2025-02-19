import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ViewedProductsState } from "@/types/types";

const initialState: ViewedProductsState = {
  viewedProductIds: [],
};

const viewedProductsSlice = createSlice({
  name: "viewedProducts",
  initialState,
  reducers: {
    addViewedProduct: (state, action: PayloadAction<string>) => {
      if (!state.viewedProductIds.includes(action.payload)) {
        state.viewedProductIds.push(action.payload);
      }
    },
    removeViewedProduct: (state, action: PayloadAction<string>) => {
      state.viewedProductIds = state.viewedProductIds.filter(
        (id) => id !== action.payload
      );
    },
    clearViewedProducts: (state) => {
      state.viewedProductIds = [];
    },
  },
});

export const { addViewedProduct, removeViewedProduct, clearViewedProducts } =
  viewedProductsSlice.actions;

export const selectViewedProductIds = (state: RootState) =>
  state.viewedProducts.viewedProductIds;

export default viewedProductsSlice.reducer;

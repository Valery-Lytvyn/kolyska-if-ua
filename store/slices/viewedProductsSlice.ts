import { ViewedProduct, ViewedProductsState } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ViewedProductsState = {
  products: [],
};

const viewedProductsSlice = createSlice({
  name: "viewedProducts",
  initialState,
  reducers: {
    addViewedProduct: (state, action: PayloadAction<ViewedProduct>) => {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (!existingProduct) {
        state.products.push(action.payload);
      }
    },
  },
});

export const { addViewedProduct } = viewedProductsSlice.actions;
export default viewedProductsSlice.reducer;

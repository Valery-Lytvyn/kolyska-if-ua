import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface WishedProductsState {
  wishedProductIds: string[];
}

const initialState: WishedProductsState = {
  wishedProductIds: [],
};

const wishedProductsSlice = createSlice({
  name: "wishedProducts",
  initialState,
  reducers: {
    addWishedProduct: (state, action: PayloadAction<string>) => {
      if (!state.wishedProductIds.includes(action.payload)) {
        state.wishedProductIds.push(action.payload);
      }
    },
    removeWishedProduct: (state, action: PayloadAction<string>) => {
      state.wishedProductIds = state.wishedProductIds.filter(
        (id) => id !== action.payload
      );
    },
    clearWishedProducts: (state) => {
      state.wishedProductIds = [];
    },
  },
});

export const { addWishedProduct, removeWishedProduct, clearWishedProducts } =
  wishedProductsSlice.actions;

export const selectWishedProductIds = (state: RootState, productId: string) =>
  state.wishedProducts.wishedProductIds.includes(productId);

export default wishedProductsSlice.reducer;

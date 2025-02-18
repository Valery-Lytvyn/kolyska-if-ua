import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CatalogState, Categories, Offer } from "@/types/types";
// import { renameCategory } from "@/helpers/renameCategory";

// Початковий стан
const initialState: CatalogState = {
  categoryMap: [],
  offers: [],
  selectedProduct: null,
  loaded: false,
  loading: false,
  error: null,
};

const catalogSlice = createSlice({
  name: "catalog",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Categories[]>) => {
      state.categoryMap = action.payload.map(
        ({ categoryId, name, cyrillicName }: Categories) => ({
          categoryId,
          name,
          cyrillicName,
        })
      );
      state.loading = false;
      state.error = null;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedProduct: (state, action: PayloadAction<Offer | null>) => {
      state.selectedProduct = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoaded(state, action: PayloadAction<boolean>) {
      state.loaded = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Селектор для отримання всіх категорій
export const selectCategories = (state: RootState) => state.catalog.categoryMap;

// Селектор для отримання продуктів за категорією або групою категорій
export const selectOffersByCategory = createSelector(
  [
    (state: RootState) => state.catalog.offers,
    (state: RootState, categoryIds: string | string[]) => categoryIds,
  ],
  (offers: Offer[], categoryIds: string | string[]): Offer[] => {
    if (Array.isArray(categoryIds)) {
      // Якщо передано масив категорій (група)
      return offers.filter((offer) => categoryIds.includes(offer.categoryId));
    } else {
      // Якщо передано одну категорію
      return offers.filter((offer) => offer.categoryId === categoryIds);
    }
  }
);

export const selectSubcategoriesByCategory = createSelector(
  [selectCategories, (state: RootState, categoryIds: string[]) => categoryIds],
  (categoryMap, categoryIds) =>
    categoryMap.filter((category) => categoryIds.includes(category.categoryId))
);

// Експорт дій та редюсера
export const {
  setOffers,
  setCategories,
  setSelectedProduct,
  setLoading,
  setError,
  setLoaded,
} = catalogSlice.actions;
export const selectSelectedProduct = (state: RootState) =>
  state.catalog.selectedProduct;
export const selectProductById = (state: RootState, productId: string) =>
  state.catalog.offers.find((offer) => offer.$.id === productId);
export const selectOffersByIds = createSelector(
  [
    (state: RootState) => state.catalog.offers,
    (state: RootState, productIds: string[]) => productIds,
  ],
  (offers, productIds) =>
    offers.filter((offer) => productIds.includes(offer.$.id))
);
export default catalogSlice.reducer;

import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CatalogState, Categories, Category, Offer } from "@/types/types";
import { fetchCatalogData } from "@/lib/fetchCatalogData";
import { fetchAdminData } from "@/lib/fetchAdminData";
import { renameCategory } from "@/helpers/renameCategory";

const initialState: CatalogState = {
  categoryMap: [],
  offers: [],
  bestOffers: [],
  newOffers: [],
  selectedProduct: null,
  loaded: false,
  loading: false,
  error: null,
};

export const fetchCatalog = createAsyncThunk(
  "catalog/fetchCatalog",
  async (_, { dispatch }) => {
    const data = await fetchCatalogData();
    const adminData = await fetchAdminData();

    const renamedCategories = data.yml_catalog.shop.categories.category
      .map((category: Category) => {
        if (!category || !category.$ || !category._) {
          console.error("Invalid category data:", category);
          return null;
        }
        return {
          categoryId: category.$.id,
          name: renameCategory(category._),
          cyrillicName: category._,
        };
      })
      .filter(Boolean);

    dispatch(setCategories(renamedCategories));
    dispatch(setOffers(data.yml_catalog.shop.offers.offer));
    dispatch(setBestOffers(adminData.bestOffer));
    dispatch(setNewOffers(adminData.newOffer));
    dispatch(setLoaded(true));
  }
);

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
    setBestOffers: (state, action: PayloadAction<string[]>) => {
      state.bestOffers = action.payload;
      state.loading = false;
      state.error = null;
    },
    setNewOffers: (state, action: PayloadAction<string[]>) => {
      state.newOffers = action.payload;
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
  setBestOffers,
  setNewOffers,
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

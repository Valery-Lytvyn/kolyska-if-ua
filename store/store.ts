import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux"; // Додайте цей імпорт
import userReducer from "./slices/userSlice";
import catalogReducer from "./slices/catalogSlice";
import cartReducer from "./slices/cartSlice";
import viewedProductsReducer from "./slices/viewedProductsSlice";
import {
  UserState,
  ViewedProductsState,
  CartState,
  CatalogState,
} from "@/types/types";

export interface RootState {
  user: UserState;
  catalog: CatalogState;
  cart: CartState;
  viewedProducts: ViewedProductsState;
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart", "viewedProducts"],
};

const rootReducer = combineReducers({
  user: userReducer,
  catalog: catalogReducer,
  cart: cartReducer,
  viewedProducts: viewedProductsReducer,
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

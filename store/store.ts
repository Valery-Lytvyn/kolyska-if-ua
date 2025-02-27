import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Action, combineReducers } from "redux";
import userReducer from "./slices/userSlice";
import catalogReducer from "./slices/catalogSlice";
import cartReducer from "./slices/cartSlice";
import viewedProductsReducer from "./slices/viewedProductsSlice";
import wishedProductsReducer from "./slices/wishedProductsSlice";
import {
  UserState,
  ViewedProductsState,
  CartState,
  CatalogState,
  WishedProductsState,
} from "@/types/types";

export interface RootState {
  user: UserState;
  catalog: CatalogState;
  cart: CartState;
  wishedProducts: WishedProductsState;
  viewedProducts: ViewedProductsState;
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cart", "viewedProducts", "wishedProducts"],
};

const rootReducer = combineReducers({
  user: userReducer,
  catalog: catalogReducer,
  cart: cartReducer,
  viewedProducts: viewedProductsReducer,
  wishedProducts: wishedProductsReducer,
});

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       // serializableCheck: {
//       //   ignoredActions: ["persist/PERSIST"],
//       // },
//       serializableCheck: false,
//     }),
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: {
        warnAfter: 100, // Increase the threshold to 100ms
      },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

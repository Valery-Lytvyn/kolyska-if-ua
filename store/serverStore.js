import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import catalogReducer from './slices/catalogSlice';
import cartReducer from './slices/cartSlice';
import viewedProductsReducer from './slices/viewedProductsSlice';
import wishedProductsReducer from './slices/wishedProductsSlice';

export const createServerStore = () => {
   return configureStore({
      reducer: {
         user: userReducer,
         catalog: catalogReducer,
         cart: cartReducer,
         viewedProducts: viewedProductsReducer,
         wishedProducts: wishedProductsReducer,
      },
      middleware: (getDefaultMiddleware) =>
         getDefaultMiddleware({
            serializableCheck: false,
         }),
   });
};
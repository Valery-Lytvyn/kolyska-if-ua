"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Category } from "@/types/types";
import { fetchCatalogData } from "@/lib/fetchCatalogData";
import { RootState, store, persistor } from "@/store/store";

import {
  setCategories,
  setLoaded,
  setOffers,
} from "@/store/slices/catalogSlice";
import { renameCategory } from "@/helpers/renameCategory";

function DataLoader() {
  const dispatch = useDispatch();
  const { loaded } = useSelector((state: RootState) => state.catalog);

  useEffect(() => {
    if (!loaded) {
      async function loadCatalog() {
        const data = await fetchCatalogData();

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
        dispatch(setLoaded(true));
      }
      loadCatalog();
    }
  }, [dispatch, loaded]);

  return null;
}

export default function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DataLoader />
        {children}
      </PersistGate>
    </Provider>
  );
}

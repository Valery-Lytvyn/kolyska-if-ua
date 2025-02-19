"use client";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, AppDispatch } from "@/store/store";
import { fetchCatalog } from "@/store/slices/catalogSlice";

function DataLoader() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);
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

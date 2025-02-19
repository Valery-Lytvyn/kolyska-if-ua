"use client";
import React from "react";
import ViewedProductList from "@/components/viewedProductList/ViewedProductList";
import { useViewedProducts } from "@/hooks/useViewedProducts";

const ViewedProductsPage: React.FC = () => {
  const filteredProducts = useViewedProducts();
  return (
    <div className="w-full h-full p-4 bg-white min-h-[calc(100vh-13rem)] mx-auto">
      <ViewedProductList
        linkHref="/"
        linkLabel="Повернутися на головну"
        products={filteredProducts}
      />
    </div>
  );
};

export default ViewedProductsPage;

"use client";
import React from "react";
import ViewedProductList from "@/components/viewedProductList/ViewedProductList";
import { useViewedProducts } from "@/hooks/useViewedProducts";
import { ROUTES } from "@/routes/routes";
import Loader from "@/app/loading";

const ViewedProductsPage: React.FC = () => {
  const filteredProducts = useViewedProducts();
  if (!!filteredProducts.length) {
    return <Loader />;
  }
  return (
    <div className="w-full h-full p-4 bg-white min-h-[calc(100vh-13rem)] mx-auto">
      <ViewedProductList
        linkHref={ROUTES.home}
        linkLabel="Повернутися на головну"
        products={filteredProducts}
      />
    </div>
  );
};

export default ViewedProductsPage;

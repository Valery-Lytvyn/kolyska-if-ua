"use client";
import React from "react";
import ViewedProductList from "../viewedProductList/ViewedProductList";
import { useViewedProducts } from "@/hooks/useViewedProducts";

const ViewedProductsSection: React.FC = () => {
  const filteredProducts = useViewedProducts();

  return (
    <>
      {!!filteredProducts.length && (
        <section className="w-full mx-auto border-t">
          <div className="w-full max-w-7xl p-4 mx-auto">
            <ViewedProductList
              products={filteredProducts}
              linkHref="/viewed-products"
              linkLabel="Всі переглянуті"
            />
          </div>
        </section>
      )}
    </>
  );
};

export default ViewedProductsSection;

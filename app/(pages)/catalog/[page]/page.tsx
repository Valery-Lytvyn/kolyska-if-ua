"use client";

import React, { Usable } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductList from "@/components/productList/ProductList";
import { notFound } from "next/navigation";
import Loader from "@/app/loading";

interface CatalogPageProps {
  params: Usable<{ page: string }>;
}

export default function CatalogPage({ params }: CatalogPageProps) {
  const unwrappedParams = React.use(params);
  const { page } = unwrappedParams;

  const categories = useSelector(
    (state: RootState) => state.catalog.categoryMap
  );
  const offers = useSelector((state: RootState) => state.catalog.offers);

  const currentPage = Number(page) || 1;
  if (isNaN(currentPage)) {
    return notFound();
  }

  if (!offers.length) {
    return <Loader />;
  }

  return (
    <div className="w-full mx-auto relative z-10 bg-white overflow-hidden min-h-screen">
      <ProductList
        categories={categories}
        offers={offers}
        currentPage={currentPage}
      />
    </div>
  );
}

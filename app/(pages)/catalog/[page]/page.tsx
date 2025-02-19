"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductList from "@/components/productList/ProductList";
import { notFound, useParams } from "next/navigation";
import Loader from "@/app/loading";
import CustomLink from "@/components/ui/CustomLink";

export default function CatalogPage() {
  const params = useParams();
  const page = Number(params?.page);

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
    <div className="w-full mx-auto relative z-10 bg-white overflow-hidden min-h-[calc(100vh-13rem)] flex flex-col items-center">
      <CustomLink href="/" label="Повернутися на головну" />
      <ProductList
        categories={categories}
        offers={offers}
        currentPage={currentPage}
      />
    </div>
  );
}

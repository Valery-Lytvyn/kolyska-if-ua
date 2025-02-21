"use client";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductList from "@/components/productList/ProductList";
import { notFound, useParams } from "next/navigation";
import Loader from "@/app/loading";
import CustomLink from "@/components/ui/CustomLink";
import { ROUTES } from "@/routes/routes";

export default function CatalogPage() {
  const params = useParams();
  const page = Number(params?.page);

  // const categories = useSelector(
  //   (state: RootState) => state.catalog.categoryMap
  // );
  const offers = useSelector((state: RootState) => state.catalog.offers);
  const isLoading = useMemo(() => offers.length === 0, [offers]);

  const currentPage = useMemo(() => Number(page) || 1, [page]);
  if (isNaN(currentPage)) return notFound();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="w-full mx-auto relative z-10 bg-white overflow-hidden min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <CustomLink
        href={ROUTES.home}
        label="Повернутися на головну"
        className="mb-4 self-start"
      />
      <ProductList
        // categories={categories}
        offers={offers}
        currentPage={currentPage}
      />
    </main>
  );
}

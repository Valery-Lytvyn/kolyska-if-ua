"use client";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductList from "@/components/productList/ProductList";
import { notFound, useParams } from "next/navigation";
import Loader from "@/app/loading";
import CustomLink from "@/components/shared/links/CustomLink";
import { ROUTES } from "@/routes/routes";

export default function CatalogPage() {
  const params = useParams();
  const page = Number(params?.page);

  const offers = useSelector((state: RootState) => state.catalog.offers);
  const isLoading = useMemo(() => offers.length === 0, [offers]);

  const currentPage = useMemo(() => Number(page) || 1, [page]);
  if (isNaN(currentPage)) return notFound();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="w-full mx-auto relative z-10 bg-white overflow-hidden min-h-[calc(100vh-13rem)] flex flex-col justify-center items-center">
      <CustomLink href={ROUTES.home} label="Повернутися на головну" />
      <ProductList offers={offers} currentPage={currentPage} />
    </main>
  );
}

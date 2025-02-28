"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductList from "@/components/productList/ProductList";
import { notFound, useParams } from "next/navigation";
import { selectOffersByCategory } from "@/store/slices/catalogSlice";
import { categorySlugToIdMap } from "@/lib/data/data";
import Loader from "@/app/loading";
import CustomLink from "@/components/shared/links/CustomLink";
import { ROUTES } from "@/routes/routes";

const CatalogPage: React.FC = () => {
  const params = useParams();
  const categorySlug = params?.categorySlug;

  const normalizedCategorySlug = Array.isArray(categorySlug)
    ? categorySlug[0]
    : categorySlug;
  const page = Array.isArray(categorySlug) ? categorySlug[1] : undefined;

  const categoryIds =
    categorySlugToIdMap[
      normalizedCategorySlug as keyof typeof categorySlugToIdMap
    ];

  const offers = useSelector((state: RootState) =>
    selectOffersByCategory(state, categoryIds || [])
  );

  const currentPage = page ? Number(page) : 1;
  if (isNaN(currentPage)) return notFound();
  if (!categoryIds) {
    return <Loader />;
  }

  return (
    <main className="w-full mx-auto relative z-10 bg-white overflow-hidden min-h-[calc(100vh-10.5rem)] sm:min-h-[calc(100vh-11.5rem)] md:min-h-[calc(100vh-13rem)] flex flex-col items-center">
      <CustomLink href={ROUTES.home} label="Повернутися на головну" />
      <ProductList
        offers={offers}
        currentPage={currentPage}
        categorySlug={normalizedCategorySlug}
        categoryId={categoryIds}
      />
    </main>
  );
};

export default CatalogPage;

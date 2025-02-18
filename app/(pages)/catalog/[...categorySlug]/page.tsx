"use client";

import React, { Usable } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductList from "@/components/productList/ProductList";
import { notFound } from "next/navigation";
import {
  selectOffersByCategory,
  selectSubcategoriesByCategory,
} from "@/store/slices/catalogSlice";
import { categorySlugToIdMap } from "@/lib/data";
import Loader from "@/app/loading";

interface CatalogPageProps {
  params: Usable<{ categorySlug: string | string[] }>;
}

function CatalogPage({ params }: CatalogPageProps) {
  const unwrappedParams = React.use(params);
  const { categorySlug } = unwrappedParams;

  const normalizedCategorySlug = Array.isArray(categorySlug)
    ? categorySlug[0]
    : categorySlug;
  const page = Array.isArray(categorySlug) ? categorySlug[1] : undefined;

  const categoryIds =
    categorySlugToIdMap[
      normalizedCategorySlug as keyof typeof categorySlugToIdMap
    ];

  const categories = useSelector((state: RootState) =>
    selectSubcategoriesByCategory(state, categoryIds)
  );
  const offers = useSelector((state: RootState) =>
    selectOffersByCategory(state, categoryIds || [])
  );

  const currentPage = page ? Number(page) : 1;
  if (isNaN(currentPage)) return notFound();
  if (!categoryIds) {
    return <Loader />;
  }

  return (
    <div className="w-full mx-auto relative z-10 bg-white overflow-hidden min-h-[calc(100vh-13rem)] flex justify-center items-center">
      <ProductList
        categories={categories}
        offers={offers}
        currentPage={currentPage}
        categorySlug={normalizedCategorySlug}
        categoryId={categoryIds}
      />
    </div>
  );
}

export default CatalogPage;

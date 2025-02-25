"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";
import ProductListSkeleton from "./ProductListSkeleton";
import SortControls from "./SortControls";
import { useViewedProducts } from "@/hooks/useViewedProducts";
import { Offer } from "@/types/types";
import LoadingSpinner from "../shared/spiners/LoadingSpinner";
import ProductCard from "../productCard/ProductCard";
import ViewedProductList from "../viewedProductList/ViewedProductList";

interface ProductListProps {
  offers: Offer[];
  currentPage: number;
  categorySlug?: string;
  categoryId?: string[];
}

const ProductList: React.FC<ProductListProps> = ({
  offers,
  currentPage,
  categorySlug,
  categoryId,
}) => {
  const [sortBy, setSortBy] = useState<"name" | "price">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryId || []
  );
  const filteredProducts = useViewedProducts();

  useEffect(() => {
    if (categoryId) {
      setSelectedCategories(categoryId);
    }
  }, [categoryId]);

  const router = useRouter();
  const itemsPerPage = 12;

  const filteredOffers = useMemo(() => {
    if (selectedCategories.length === 0) return offers;
    return offers.filter((offer) =>
      selectedCategories.includes(offer.categoryId)
    );
  }, [offers, selectedCategories]);

  const sortedOffers = useMemo(() => {
    return [...filteredOffers].sort((a, b) => {
      if (sortBy === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return sortDirection === "asc"
          ? parseFloat(a.price) - parseFloat(b.price)
          : parseFloat(b.price) - parseFloat(a.price);
      }
    });
  }, [filteredOffers, sortBy, sortDirection]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedOffers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      if (categorySlug) {
        router.push(
          `/catalog/${encodeURIComponent(categorySlug)}/${pageNumber}`
        );
      } else {
        router.push(`/catalog/${pageNumber}`);
      }
    },
    [categorySlug, router]
  );

  const handleCategoryChange = useCallback((categoryId: string | null) => {
    if (categoryId === null) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([categoryId]);
    }
  }, []);

  if (currentItems.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <main className="w-full max-w-7xl mx-auto p-4 z-10 relative flex flex-col">
      <SortControls
        sortBy={sortBy}
        sortDirection={sortDirection}
        categorySlug={categorySlug}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
        onCategoryChange={handleCategoryChange}
      />

      {!!currentItems.length ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8 flex-1">
          {currentItems.map((offer, index) => (
            <ProductCard
              index={index}
              key={offer.$.id}
              productId={offer.$.id}
              price={offer.price}
              imageUrl={offer.picture}
              productName={offer.name}
            />
          ))}
        </section>
      ) : (
        <ProductListSkeleton />
      )}

      {filteredOffers.length > 0 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredOffers.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          categorySlug={categorySlug}
        />
      )}

      <ViewedProductList
        products={filteredProducts}
        linkHref="/viewed-products"
        linkLabel="Всі переглянуті"
      />
    </main>
  );
};

export default React.memo(ProductList);

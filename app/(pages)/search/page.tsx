"use client";
import React, { useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { RootState } from "@/store/store";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ProductCard from "@/components/ui/productCard/ProductCard";

const Pagination = dynamic(
  () => import("@/components/productList/Pagination"),
  {
    ssr: false,
  }
);

const ITEMS_PER_PAGE = 12;

const SearchPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams?.get("q") || "";
  const page = searchParams?.get("page") || "1";

  const currentPage = parseInt(page, 10);

  const offers = useSelector((state: RootState) => state.catalog.offers);

  const filteredOffers = useMemo(() => {
    if (!searchQuery) return [];
    return offers.filter((offer) =>
      offer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [offers, searchQuery]);

  const paginatedOffers = useMemo(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    return filteredOffers.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredOffers, currentPage]);

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      router.push(`/search?q=${searchQuery}&page=${pageNumber}`);
    },
    [router, searchQuery]
  );

  if (!offers.length) {
    return (
      <main className="w-full max-w-7xl mx-auto p-4 z-10 relative flex flex-col items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </main>
    );
  }

  if (!paginatedOffers.length) {
    return (
      <main className="w-full max-w-7xl mx-auto p-4 z-10 relative flex flex-col items-center justify-center min-h-[60vh]">
        <p className="mt-4 text-gray-600">
          Нічого не знайдено за запитом `{searchQuery}`
        </p>
      </main>
    );
  }

  return (
    <main className="w-full max-w-7xl mx-auto p-4 z-10 relative flex flex-col">
      {/* Product Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8 flex-1">
        {paginatedOffers.map((offer, index) => (
          <article key={offer.$.id}>
            <ProductCard
              index={index}
              productId={offer.$.id}
              price={offer.price}
              imageUrl={offer.picture}
              productName={offer.name}
            />
          </article>
        ))}
      </section>

      {/* Pagination */}
      {filteredOffers.length > ITEMS_PER_PAGE && (
        <Pagination
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={filteredOffers.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  );
};

export default SearchPage;

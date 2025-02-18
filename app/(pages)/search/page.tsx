"use client";
import React, { useMemo, useCallback, Usable } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ProductCard from "@/components/ui/ProductCard";

const Pagination = dynamic(
  () => import("@/components/productList/Pagination"),
  {
    ssr: false,
  }
);

interface SearchPageProps {
  searchParams: Usable<{
    q?: string;
    page?: string;
  }>;
}
const ITEMS_PER_PAGE = 12;

const SearchPage: React.FC<SearchPageProps> = ({ searchParams }) => {
  const router = useRouter();
  const { q: searchQuery = "", page: pageParam = "1" } =
    React.use(searchParams);
  const currentPage = parseInt(pageParam, 10) || 1;

  // Fetch offers from Redux store
  const offers = useSelector((state: RootState) => state.catalog.offers);

  // Filter offers based on search term
  const filteredOffers = useMemo(() => {
    if (!searchQuery) return [];
    return offers.filter((offer) =>
      offer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [offers, searchQuery]);

  // Pagination logic
  const paginatedOffers = useMemo(() => {
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    return filteredOffers.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredOffers, currentPage]);

  // Handle page change
  const handlePageChange = useCallback(
    (pageNumber: number) => {
      router.push(`/search?q=${searchQuery}&page=${pageNumber}`);
    },
    [router, searchQuery]
  );

  // Loading state
  if (!offers.length) {
    return (
      <main className="w-full max-w-7xl mx-auto p-4 z-10 relative flex flex-col items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </main>
    );
  }

  // No results found
  if (!paginatedOffers.length) {
    return (
      <main className="w-full max-w-7xl mx-auto p-4 z-10 relative flex flex-col items-center justify-center min-h-[60vh]">
        <p className="mt-4 text-gray-600">
          Нічого не знайдено за запитом `{searchQuery}`
        </p>
      </main>
    );
  }
  console.log("Filtered Offers:", filteredOffers);
  console.log("Paginated Offers:", paginatedOffers);

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

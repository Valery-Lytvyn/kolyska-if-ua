"use client";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { RootState } from "@/store/store";
import { ITEMS_PER_PAGE } from "@/lib/data/constants";
import Loader from "@/app/loading";
import ProductList from "@/components/productList/ProductList";
import CustomLink from "@/components/shared/links/CustomLink";
import { ROUTES } from "@/routes/routes";

const SearchPage: React.FC = () => {
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

  if (!offers.length) {
    return <Loader />;
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
    <main className="w-full mx-auto relative z-10 bg-white overflow-hidden min-h-[calc(100vh-10.5rem)] sm:min-h-[calc(100vh-11.5rem)] md:min-h-[calc(100vh-13rem)] flex flex-col items-center">
      <CustomLink href={ROUTES.home} label="Повернутися на головну" />
      <ProductList
        offers={filteredOffers}
        currentPage={currentPage}
        searchQuery={searchQuery}
      />
    </main>
  );
};

export default SearchPage;

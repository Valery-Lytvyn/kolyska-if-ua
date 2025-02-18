"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Offer, Categories } from "@/types/types";
import SortControls from "./SortControls";
import ProductCard from "../ui/ProductCard";
import Pagination from "./Pagination";
import LoadingSpinner from "../ui/LoadingSpinner";

interface ProductListProps {
  categories: Categories[];
  offers: Offer[];
  currentPage: number;
  categorySlug?: string;
  categoryId?: string[];
}

const ProductList: React.FC<ProductListProps> = ({
  categories,
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

  // Синхронізація selectedCategories з categoryId
  useEffect(() => {
    if (categoryId) {
      setSelectedCategories(categoryId);
    }
  }, [categoryId]);

  const router = useRouter();
  const itemsPerPage = 12;

  // Фільтрація пропозицій за вибраними категоріями
  const filteredOffers = useMemo(() => {
    if (selectedCategories.length === 0) return offers;
    return offers.filter((offer) =>
      selectedCategories.includes(offer.categoryId)
    );
  }, [offers, selectedCategories]);

  // Сортування пропозицій
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

  // Пагінація
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedOffers.slice(indexOfFirstItem, indexOfLastItem);

  // Зміна сторінки
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

  // Обробка вибору категорій
  const handleCategoryChange = useCallback((categoryId: string | null) => {
    setSelectedCategories((prev) => {
      if (categoryId === null) return []; // Скидання вибору
      if (prev.includes(categoryId)) {
        // Видалення категорії, якщо вона вже вибрана
        return prev.filter((id) => id !== categoryId);
      } else {
        // Додавання категорії
        return [...prev, categoryId];
      }
    });
  }, []);

  // Відображення завантажувального спінера, якщо немає товарів
  if (currentItems.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <main className="w-full max-w-7xl mx-auto p-4 z-10 relative flex flex-col">
      {/* Елементи управління сортуванням */}
      <SortControls
        sortBy={sortBy}
        sortDirection={sortDirection}
        selectedCategories={selectedCategories}
        categories={categories}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
        onCategoryChange={handleCategoryChange}
        isCategoryDisabled={!!categorySlug}
      />

      {/* Сітка товарів */}
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

      {/* Пагінація */}
      {filteredOffers.length > 0 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredOffers.length}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          categorySlug={categorySlug}
        />
      )}
    </main>
  );
};

export default ProductList;

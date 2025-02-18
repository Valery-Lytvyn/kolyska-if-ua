"use client";
import { Categories } from "@/types/types";
import React, { useCallback } from "react";
import CustomDropdown from "./CustomDropdown";

interface SortControlsProps {
  sortBy: "name" | "price";
  sortDirection: "asc" | "desc";
  selectedCategories: string[]; // Тепер це масив
  categories: Categories[];
  onSortByChange: (sortBy: "name" | "price") => void;
  onSortDirectionChange: (sortDirection: "asc" | "desc") => void;
  onCategoryChange: (categoryId: string | null) => void;
  isCategoryDisabled?: boolean;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortBy,
  sortDirection,
  selectedCategories,
  categories,
  onSortByChange,
  onSortDirectionChange,
  onCategoryChange,
  isCategoryDisabled = false,
}) => {
  const handleSortByChange = useCallback(
    (type: "name" | "price") => {
      if (sortBy === type) {
        onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc");
      } else {
        onSortByChange(type);
        onSortDirectionChange("asc");
      }
    },
    [sortBy, sortDirection, onSortByChange, onSortDirectionChange]
  );

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      {/* Кнопки сортування */}
      <div className="flex gap-4">
        <button
          onClick={() => handleSortByChange("name")}
          aria-label="Sort by name"
          className={`px-4 py-2 rounded-lg ${
            sortBy === "name"
              ? "bg-primary text-white"
              : "bg-light-gray text-primary"
          }`}
        >
          Sort by Name{" "}
          {sortBy === "name" && (sortDirection === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSortByChange("price")}
          aria-label="Sort by price"
          className={`px-4 py-2 rounded-lg ${
            sortBy === "price"
              ? "bg-primary text-white"
              : "bg-light-gray text-primary"
          }`}
        >
          Sort by Price{" "}
          {sortBy === "price" && (sortDirection === "asc" ? "↑" : "↓")}
        </button>
      </div>

      {/* Випадаючий список категорій */}
      {!isCategoryDisabled && (
        <CustomDropdown
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
        />
      )}
    </div>
  );
};

export default SortControls;

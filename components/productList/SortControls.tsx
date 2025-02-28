"use client";
import React, { useCallback } from "react";
import CustomDropdown from "./CustomDropdown";

interface SortControlsProps {
  sortBy: "name" | "price";
  sortDirection: "asc" | "desc";
  categorySlug?: string;
  onSortByChange: (sortBy: "name" | "price") => void;
  onSortDirectionChange: (sortDirection: "asc" | "desc") => void;
  onCategoryChange: (categoryId: string | null) => void;
  isDisabled?: boolean;
}

const SortControls: React.FC<SortControlsProps> = ({
  sortBy,
  sortDirection,
  categorySlug,
  onSortByChange,
  onSortDirectionChange,
    isDisabled = false,
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
      <div className="flex gap-4">
        <button
          onClick={() => handleSortByChange("name")}
          aria-label="Сортувати за ім'ям"
          className={`px-4 py-2 rounded-lg ${
            sortBy === "name"
              ? "bg-primary text-white"
              : "bg-light-gray text-primary"
          }`}
        >
          Сортувати за ім&apos;ям{" "}
          {sortBy === "name" && (sortDirection === "asc" ? "↑" : "↓")}
        </button>
        <button
          onClick={() => handleSortByChange("price")}
          aria-label="Сортувати за ціною"
          className={`px-4 py-2 rounded-lg ${
            sortBy === "price"
              ? "bg-primary text-white"
              : "bg-light-gray text-primary"
          }`}
        >
          Сортувати за ціною{" "}
          {sortBy === "price" && (sortDirection === "asc" ? "↑" : "↓")}
        </button>
      </div>

      <CustomDropdown categorySlug={categorySlug} isDisabled={isDisabled} />
    </div>
  );
};

export default React.memo(SortControls);

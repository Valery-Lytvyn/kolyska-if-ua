"use client";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { Categories } from "@/types/types";
import { useState, useRef } from "react";

interface CustomDropdownProps {
  categories: Categories[];
  selectedCategories: string[]; // Тепер це масив
  onCategoryChange: (categoryId: string | null) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  categories,
  selectedCategories,
  onCategoryChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef as React.RefObject<HTMLElement>, () =>
    setIsOpen(false)
  );

  const handleCategorySelect = (categoryId: string | null) => {
    onCategoryChange(categoryId);
    setIsOpen(false);
  };

  if (!categories) return null;

  return (
    <div className="relative w-56" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Filter by category"
        className="px-4 py-2 rounded-lg bg-light-gray text-primary flex items-center justify-between w-full"
      >
        {selectedCategories.length > 0
          ? selectedCategories
              .map(
                (id) => categories.find((cat) => cat.categoryId === id)?.name
              )
              .join(", ")
          : "Всі категорії"}
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-30 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <li
            onClick={() => handleCategorySelect(null)}
            className="px-4 py-2 hover:bg-accent-hover cursor-pointer"
          >
            Всі категорії
          </li>
          {categories.map((category) => (
            <li
              key={category.categoryId}
              onClick={() => handleCategorySelect(category.categoryId)}
              className={`px-4 py-2 hover:bg-accent-hover cursor-pointer ${
                selectedCategories.includes(category.categoryId)
                  ? "bg-accent text-white"
                  : ""
              }`}
            >
              {category.cyrillicName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;

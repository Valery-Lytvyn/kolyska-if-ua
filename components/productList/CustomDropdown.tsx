"use client";
import React, { useState, useRef, useCallback, useMemo } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { menuItems } from "@/lib/data/data";
import Link from "next/link";
import { MenuItem } from "@/types/types";
import { ROUTES } from "@/routes/routes";

interface CustomDropdownProps {
  categorySlug?: string;
  isDisabled?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  categorySlug,
  isDisabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useOnClickOutside(dropdownRef as React.RefObject<HTMLElement>, () =>
    setIsOpen(false)
  );

  // Memoize the current category to avoid recalculating on every render
  const currentCategory = useMemo(() => {
    const findCategory = (
      items: MenuItem[],
      slug: string
    ): string | undefined => {
      for (const item of items) {
        if (item.href === slug) return item.title;
        if (item.children) {
          const found = findCategory(item.children, slug);
          if (found) return found;
        }
      }
    };
    return categorySlug
      ? findCategory(menuItems, categorySlug)
      : "Всі категорії";
  }, [categorySlug]);

  // Toggle dropdown visibility
  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);

  if (isDisabled) return null;

  return (
    <div className="relative w-56" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        aria-label="Filter by category"
        aria-expanded={isOpen}
        className="px-4 py-2 rounded-lg bg-light-gray text-primary hover:bg-accent-hover transition-colors duration-200 flex items-center justify-between w-full focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
      >
        <span className="truncate">{currentCategory}</span>
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

      {/* Dropdown Menu */}
      {isOpen && (
        <ul className="absolute z-30 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden space-y-1 animate-fade-in">
          {menuItems.map(({ title, href, children }) => (
            <li key={href}>
              <Link
                href={
                  href === "catalog"
                    ? `${ROUTES.catalog}`
                    : `${ROUTES.catalogSection(href)}`
                }
                className={`block px-4 py-2 text-sm font-semibold text-secondary hover:bg-accent-hover hover:text-white transition-colors duration-200 ${
                  title === currentCategory ? "bg-accent text-white" : ""
                }`}
              >
                {title}
              </Link>

              {/* Nested Children */}
              {children && (
                <ul className="pl-4 space-y-1">
                  {children.map(({ href, title }) => (
                    <li key={href}>
                      <Link
                        href={ROUTES.catalogSection(href)}
                        className={`block px-4 py-2 text-sm text-secondary hover:bg-accent-hover hover:text-white transition-colors duration-200 ${
                          title === currentCategory
                            ? "bg-accent text-white"
                            : ""
                        }`}
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default React.memo(CustomDropdown);

"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CustomInput from "../shared/inputs/CustomInput";
import SearchButton from "../shared/buttons/SearchButton";
import { useToast } from "@/providers/ToastContext";

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();
  const { showToast } = useToast();

  const handleSearchInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(ev.target.value);
  };

  const handleSearchSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (searchQuery.trim()) {
      setSearchQuery("");
      const encodedQuery = encodeURIComponent(searchQuery.trim());
      router.push(`/search?q=${encodedQuery}&page=1`);
    } else {
      showToast("Введіть назву товару!", "error");
    }
  };

  return (
    <form
      className="flex items-center gap-2 "
      onSubmit={handleSearchSubmit}
      role="search"
    >
      <label htmlFor="search" className="sr-only">
        Пошук товарів
      </label>
      <CustomInput
        type="text"
        placeholder="Введіть назву товару..."
        name="search"
        value={searchQuery}
        onChange={handleSearchInputChange}
        aria-label="Пошук товарів"
      />
      <SearchButton />
    </form>
  );
};

export default SearchBar;

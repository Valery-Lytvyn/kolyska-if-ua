"use client";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { useState } from "react";
import AuthButton from "../ui/buttons/AuthButton";
import CartButton from "../ui/buttons/CartButton";
import { menuItems, navItems } from "@/lib/data";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import DesktopMenu from "../menu/DesktopMenu";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import WishlistButton from "../ui/buttons/WishlistButton";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";
import MobileMenu from "./MobileMenu";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const quantityWishedItems = useSelector(
    (state: RootState) => state.wishedProducts.wishedProductIds.length
  );

  const quantityItemsInCart = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <header className="w-full flex flex-col bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-white text-sm py-2 w-full">
        <div className="max-w-7xl mx-auto flex flex-col-reverse gap-4 sm:gap-2 sm:flex-row  justify-between items-center px-4">
          <Navbar navItems={navItems} />
          <div className="flex gap-4">
            <a
              href="tel:0501234567"
              className="hover:underline flex justify-center items-center group transition-colors text-xl sm:text-lg"
            >
              <MdLocalPhone className="text-xl text-accent group-hover:text-xl transition-all" />{" "}
              050-123-45-67
            </a>
            <div className="hidden sm:flex flex-col text-sm">
              <span>Пн-Пт: 9:00 - 18:00</span>
              <span>Сб-Нд: 10:00 - 18:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row flex-wrap justify-between items-center p-4 gap-4 w-full">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-primary hover:text-primary-hover transition-colors title"
        >
          Kolyska.if.ua
        </Link>

        {/* Search */}
        <SearchBar />

        <div className="flex items-center gap-4 justify-between w-full md:w-fit">
          {/* Cart & Auth & Wishlist */}
          <div className="flex items-center gap-4">
            <WishlistButton
              quantityWishedItems={quantityWishedItems}
              onClick={() => router.push("/wished-products")}
            />
            {/* Cart */}
            <CartButton
              quantityItemsInCart={quantityItemsInCart}
              onClick={() => router.push("/cart")}
            />
            {/* Auth */}
            <AuthButton />
          </div>
          {/* Mobile Menu Button */}
          <button
            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors lg:hidden relative z-50"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Відкрити мобільне меню"
          >
            <IoMenu className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full border-y border-gray-200 hidden md:block">
        <nav className="max-w-7xl mx-auto p-4">
          <DesktopMenu menuItems={menuItems} />
        </nav>
      </div>
      <AnimatePresence>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <MobileMenu
            navItems={navItems}
            menuItems={menuItems}
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

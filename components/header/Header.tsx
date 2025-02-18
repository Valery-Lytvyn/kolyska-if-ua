"use client";

import Link from "next/link";
import { IoHeartOutline, IoMenu, IoClose } from "react-icons/io5";
import { MdLocalPhone } from "react-icons/md";
import { motion } from "framer-motion";
import { useState } from "react";
import AuthButton from "../ui/buttons/AuthButton";
import CartButton from "../ui/buttons/CartButton";
import { menuItems, navItems } from "@/lib/data";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import DesktopMenu from "../menu/DesktopMenu";
import MobileMenu from "../menu/MobileMenu";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <motion.button
              className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Wishlist"
            >
              <IoHeartOutline className="text-2xl" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">
                1
              </span>
            </motion.button>
            {/* Cart */}
            <CartButton />
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
      <div className="w-full border-t border-gray-200 hidden md:block">
        <nav className="max-w-7xl mx-auto p-4">
          <DesktopMenu menuItems={menuItems} />
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-primary bg-opacity-95 z-50">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Закрити мобільне меню"
          >
            <IoClose />
          </button>

          <div className="flex flex-col items-center justify-center h-full gap-8">
            {/* Top-level navItems as icons */}
            <div className="flex gap-6">
              {navItems.map(({ item, href, icon }) => (
                <Link
                  key={item}
                  href={href}
                  className="text-white text-2xl hover:text-accent transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={item}
                >
                  {icon}
                </Link>
              ))}
            </div>

            {/* Menu items as a dropdown list */}
            {/* <ul className="flex flex-col  gap-4">
              {menuItems.map(({ title, href, children }) => (
                <li key={title} className="text-white text-lg">
                  <Link href={href} onClick={() => setMobileMenuOpen(false)}>
                    {title}
                  </Link>
                  {children && (
                    <ul className="pl-4 mt-2">
                      {children.map((child) => (
                        <li key={child.title} className="text-sm">
                          <Link
                            href={child.href}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul> */}
            <div className="flex-col  flex gap-4">
              <MobileMenu menuItems={menuItems} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

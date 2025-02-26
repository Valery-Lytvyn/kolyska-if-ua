"use client";
import React from "react";
import Link from "next/link";
import { NavItem } from "@/types/types";
interface DesktopNavbarProps {
  navItems: NavItem[];
}
const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ navItems }) => (
  <nav className="hidden md:flex gap-4">
    {navItems.map(({ item, href }) => (
      <Link
        key={item}
        href={href}
        aria-label={item}
        className="relative py-2 px-3 hover:text-accent transition-colors"
      >
        {item}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
      </Link>
    ))}
  </nav>
);
export default DesktopNavbar;

import Link from "next/link";
import React from "react";
import { NavItem } from "@/types/types";
interface NavbarProps {
  navItems: NavItem[];
}
const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  return (
    <nav aria-label="Верхня навігація">
      <ul className="flex gap-2 sm:gap-4 flex-wrap">
        {navItems.map(({ item, href, icon: IconComponent }) => (
          <li key={item} className="group">
            <Link href={href}>
              {/* Mobile Navbar */}
              <div className="md:hidden relative py-1 px-2 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-accent">
                <IconComponent className="text-2xl" />
              </div>
              {/* Desktop Navbar */}
              <div className="hidden relative md:inline-block py-1 px-2 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:text-accent">
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

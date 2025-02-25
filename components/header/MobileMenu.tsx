import React from "react";
import { motion } from "motion/react";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import ExpandedMenu from "../menu/ExpandedMenu";
import { MenuItem, NavItem } from "@/types/types";

interface MobileMenuProps {
  navItems: NavItem[];
  menuItems: MenuItem[];
  onClick: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  navItems,
  menuItems,
  onClick,
}) => {
  return (
    <motion.div
      className="md:hidden fixed inset-0 bg-primary bg-opacity-95 z-50"
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: "-100%" }}
      transition={{ duration: 0.5 }}
    >
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={onClick}
        aria-label="Закрити мобільне меню"
      >
        <IoClose />
      </button>

      <div className="flex flex-col items-center justify-center h-full gap-8">
        {/* Top-level navItems as icons */}
        <ul className="flex gap-6">
          {navItems.map(({ item, href, icon: Icon }) => (
            <li key={item}>
              <Link href={href} onClick={onClick} aria-label={item}>
                <Icon className="text-white text-2xl hover:text-accent transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex-col  flex gap-4 border-5">
          <ExpandedMenu menuItems={menuItems} onClick={onClick} />
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;

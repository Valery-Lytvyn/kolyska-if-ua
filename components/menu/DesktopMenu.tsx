import { slideInTop } from "@/lib/animations/animations";
import { ROUTES } from "@/routes/routes";
import { RootState } from "@/store/store";
import { MenuItem } from "@/types/types";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

interface MenuProps {
  menuItems: MenuItem[];
}

const DesktopMenu: React.FC<MenuProps> = ({ menuItems }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const categoryNames = useSelector(
    (state: RootState) => state.catalog.categoryMap
  ).map((c) => c.name);

  return (
    <ul className="flex justify-center items-center gap-2 lg:gap-6 flex-wrap">
      {menuItems.map(({ title, href, children }) => (
        <li
          key={title}
          onMouseEnter={() => setHoveredItem(title)}
          onMouseLeave={() => setHoveredItem(null)}
          className="relative group"
        >
          <Link
            href={
              href === "catalog"
                ? `${ROUTES.catalog}`
                : `${ROUTES.catalogSection(href)}`
            }
            className="relative inline-block py-2 px-4 text-gray-700 transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:text-accent font-bold"
          >
            {title}
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 ease-in-out group-hover:w-full"></span>
          </Link>
          <AnimatePresence>
            {children && hoveredItem === title && (
              <div className="absolute top-full left-0 bg-transparent mt-0 z-30 overflow-hidden w-48">
                <motion.ul className="w-full" {...slideInTop}>
                  <div className="mt-4 shadow-lg rounded-b-lg w-full bg-white">
                    {children.map(({ title, href }) => (
                      <Fragment key={href}>
                        {categoryNames.includes(href) && (
                          <li>
                            <Link
                              href={ROUTES.catalogSection(href)}
                              className="block px-4 py-2 hover:bg-accent hover:text-white transition-colors duration-200"
                            >
                              {title}
                            </Link>
                          </li>
                        )}
                      </Fragment>
                    ))}
                  </div>
                </motion.ul>
              </div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
};

export default DesktopMenu;

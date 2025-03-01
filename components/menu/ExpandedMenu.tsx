"use client";
import { ROUTES } from "@/routes/routes";
import { RootState } from "@/store/store";
import { MenuItem } from "@/types/types";
import Link from "next/link";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

interface ExpandedMenuProps {
  menuItems: MenuItem[];
  onClick?: () => void;
}
const ExpandedMenu: React.FC<ExpandedMenuProps> = ({ menuItems, onClick }) => {
  const categoryNames = useSelector(
    (state: RootState) => state.catalog.categoryMap
  ).map((c) => c.name);
  return (
    <ul className="space-y-2 relative z-50">
      {menuItems.map(({ title, href, children }) => (
        <li key={href}>
          <Link
            href={
              href === "catalog"
                ? `${ROUTES.catalog}`
                : `${ROUTES.catalogSection(href)}`
            }
            className="hover:text-accent text-white transition-colors duration-200"
            onClick={onClick}
          >
            {title}
          </Link>
          {children && (
            <ul className="pl-4 mt-2 space-y-1">
              {children.map(({ href, title }) => (
                <Fragment key={href}>
                  {categoryNames.includes(href) && (
                    <li>
                      <Link
                        href={ROUTES.catalogSection(href)}
                        className="hover:text-accent transition-colors duration-200 text-white"
                        onClick={onClick}
                      >
                        {title}
                      </Link>
                    </li>
                  )}
                </Fragment>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ExpandedMenu;

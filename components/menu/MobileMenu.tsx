import { MenuItem } from "@/lib/data";
import Link from "next/link";
import React from "react";

interface ExpandedMenuProps {
  menuItems: MenuItem[];
}
const ExpandedMenu: React.FC<ExpandedMenuProps> = ({ menuItems }) => {
  return (
    <ul className="space-y-2 relative z-50">
      {menuItems.map(({ title, href, children }) => (
        <li key={href}>
          <Link
            href={href}
            className="hover:text-accent text-white transition-colors duration-200"
          >
            {title}
          </Link>
          {children && (
            <ul className="pl-4 mt-2 space-y-1">
              {children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="hover:text-accent transition-colors duration-200 text-white"
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ExpandedMenu;

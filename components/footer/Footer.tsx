import { menuItems, navItems } from "@/lib/data/data";
import Link from "next/link";
import React from "react";
import ExpandedMenu from "../menu/ExpandedMenu";
import { ROUTES } from "@/routes/routes";
import { CONTACTS, LOCATIONS } from "@/lib/data/constants";
import Socials from "../shared/socials/Socials";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-12 z-10 relative ">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap gap-8 sm:justify-evenly ">
        {/* Catalog */}
        <div className="flex-col  flex gap-4">
          <h2 className="text-lg font-bold mb-4 text-accent">Каталог</h2>
          <ExpandedMenu menuItems={menuItems} />
        </div>

        <div className="flex-col  flex gap-8 justify-between">
          {/* Contacts */}
          <div className="sm:col-span-2 md:col-span-1">
            <h2 className="text-lg font-bold mb-4 text-accent">Контакти</h2>
            <p className="mb-2">
              Телефон:{" "}
              <a
                href={`tel:${CONTACTS.phone.value}`}
                className="hover:text-accent transition-colors duration-200"
                aria-label={CONTACTS.phone.label}
              >
                {CONTACTS.phone.value}
              </a>
            </p>
            <p className="mb-2">Адреси магазинів:</p>
            <ul className="space-y-1">
              <li>
                <span className="text-accent text-lg pr-2">
                  {LOCATIONS[0].name}:
                </span>
                {LOCATIONS[0].address}
              </li>
              <li>
                <span className="text-accent text-lg pr-2">
                  {LOCATIONS[1].name}:
                </span>
                {LOCATIONS[1].address}
              </li>
            </ul>
            {/* Socials */}
            <Socials className="text-accent hover:text-accent-hover transition-colors duration-200" />
          </div>
          {/* Navigation */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-accent">Навігація</h2>
            <ul className="space-y-2">
              {navItems.map(({ item, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-accent transition-colors duration-200"
                    aria-label={item}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 border-t border-white/20 pt-6">
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <Link
            href={ROUTES.home}
            className="font-bold text-accent hover:text-accent-hover transition-colors duration-200"
          >
            Kolyska.if.ua
          </Link>
          . Всі права захищені.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

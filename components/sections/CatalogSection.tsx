"use client";
import { menuItems } from "@/lib/data/data";
import { motion } from "framer-motion"; // Використовуємо framer-motion для анімацій
import Link from "next/link";
import { FC } from "react";
import SectionTitle from "../typography/SectionTitle";
import Image from "next/image";
import SectionSlogan from "../typography/SectionSlogan";
import { ROUTES } from "@/routes/routes";

const CatalogSection: FC = () => {
  return (
    <section className="relative z-20 bg-white py-16 text-primary">
      <div className="max-w-7xl mx-auto w-full px-4">
        {/* Заголовок та слоган */}
        <div className="text-center mb-12">
          <SectionTitle title="Наш асортимент" />
          <SectionSlogan slogan="Знайдіть ідеальне рішення для себе" />
        </div>

        {/* Сітка каталогу */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(({ title, href, children }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-light-gray"
            >
              {/* Посилання на категорію */}
              <Link
                href={href === "catalog" ? `${ROUTES.catalog}` : `${href}`}
                className="block"
              >
                <h3 className="text-2xl font-bold text-primary hover:text-accent transition-colors duration-300">
                  {title}
                </h3>
              </Link>

              {/* Підкатегорії */}
              {children && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {children.map(({ title, href }, subIndex) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: subIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="w-full sm:w-[calc(50%-0.75rem)] lg:w-full"
                    >
                      <Link
                        href={href}
                        className="block bg-white p-4 rounded-lg text-primary shadow-md hover:shadow-lg hover:bg-accent-hover transition-colors duration-300 text-xl group"
                      >
                        <span className="text-secondary group-hover:text-white transition-colors duration-300">
                          {title}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Фонові елементи */}
      <div className="absolute bottom-0 left-0 w-2/5 h-1/2 -z-0 overflow-hidden pr-2">
        <div className="dots w-full h-full"></div>
      </div>
      <div className="absolute inset-0 w-full h-full -z-0 overflow-hidden hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex w-full h-full justify-end items-end"
        >
          <Image
            src="/bg-offers.webp"
            alt="Фонове зображення коляски"
            width={800}
            height={600}
            loading="lazy"
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-auto object-cover opacity-30 object-right-bottom"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CatalogSection;

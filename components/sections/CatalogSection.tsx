"use client";
import { menuItems } from "@/lib/data";
import { motion } from "motion/react";
import Link from "next/link";
import { FC } from "react";
import SectionTitle from "../typography/SectionTitle";
import { PAGE_NUMBER } from "@/lib/contants";
import Image from "next/image";
import SectionSlogan from "../typography/SectionSlogan";

const CatalogSection: FC = () => {
  return (
    <section className="relative z-20 bg-white py-16 text-primary">
      <div className="max-w-7xl mx-auto w-full px-4">
        <div className="text-center mb-12">
          <SectionTitle title="Наш асортимент" />
          <SectionSlogan slogan="Знайдіть ідеальне рішення для себе" />
        </div>
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
              <Link
                href={
                  href === "catalog"
                    ? `/catalog/${PAGE_NUMBER}`
                    : `/catalog/${encodeURIComponent(href)}/${PAGE_NUMBER}`
                }
                className="flex text-2xl font-bold text-primary rounded-lg hover:text-accent transition-colors duration-300 bg-white p-6 title"
              >
                {title}
              </Link>
              {children && (
                <div className="mt-4 flex  flex-wrap gap-x-3 gap-y-6">
                  {children.map(({ title, href }, subIndex) => (
                    <motion.div
                      key={title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: subIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white p-4 rounded-lg  flex-grow text-primary shadow-md hover:shadow-lg hover:bg-accent-hover transition-colors duration-300 text-xl group"
                    >
                      <Link
                        href={href}
                        className="text-secondary group-hover:text-white transition-colors duration-300"
                      >
                        {title}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      {/* Background elements */}
      <div className="absolute bottom-0 left-0 w-2/5 h-1/2 -z-0  overflow-hidden pr-2">
        <div className="dots w-full h-full"></div>
      </div>
      <div className="absolute inset-0 w-full h-full -z-0  overflow-hidden  hidden md:block">
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex w-full h-full justify-end items-end "
        >
          <Image
            src="/bg-offers.webp"
            alt="Фонове зображення коляски"
            width={800}
            height={600}
            loading="lazy"
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className=" h-full w-auto object-cover opacity-30 object-right-bottom"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CatalogSection;

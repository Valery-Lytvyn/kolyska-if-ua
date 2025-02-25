"use client";
import React from "react";
import { motion } from "motion/react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <motion.article
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 h-full group w-full border border-transparent hover:border-accent-hover"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col h-full justify-between w-full">
        {/* Image Section */}
        <figure className="relative h-60 w-full bg-gray-200 animate-pulse flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-gray-300" />
        </figure>

        {/* Content Section */}
        <motion.section className="p-4 flex flex-col justify-between flex-1 bg-white relative overflow-hidden z-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
          </h3>
          <div className="flex justify-between items-center">
            <motion.span
              className="text-xl font-bold text-primary"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <div className="h-6 bg-gray-200 animate-pulse rounded w-1/2" />
            </motion.span>
            <div className="h-10 w-24 bg-gray-200 animate-pulse rounded" />
          </div>
        </motion.section>
      </div>
    </motion.article>
  );
};

export default ProductCardSkeleton;

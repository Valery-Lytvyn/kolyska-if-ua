"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaCheck, FaTag, FaTruck } from "react-icons/fa";

interface Advantage {
  title: string;
  icon: React.ElementType;
}

const advantages: Advantage[] = [
  { title: "Вигідні ціни", icon: FaTag },
  { title: "Якість товару", icon: FaCheck },
  { title: "Надійна гарантія", icon: FaShieldAlt },
  { title: "Швидка доставка", icon: FaTruck },
];

const AdvantageTiles: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      {advantages.map(({ title, icon: Icon }, index) => (
        <motion.div
          key={index}
          className="p-6 bg-white/50 rounded-lg flex flex-col items-center justify-center gap-4 border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
        >
          <div className="p-4 bg-primary hover:bg-primary-hover rounded-full transition-colors duration-300">
            <Icon
              className="text-3xl md:text-4xl text-accent"
              aria-label={title}
            />
          </div>
          <h3 className="text-center text-xl font-semibold text-secondary">
            {title}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

export default AdvantageTiles;

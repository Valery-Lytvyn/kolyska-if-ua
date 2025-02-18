"use client";
import React from "react";
import { motion } from "motion/react";

interface SectionTitleProps {
  title: string;
  styles?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, styles }) => {
  return (
    <motion.h2
      className={`${styles} text-4xl md:text-5xl lg:text-6xl  text-balance font-bold text-primary py-2`}
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      }}
    >
      {title}
    </motion.h2>
  );
};

export default SectionTitle;

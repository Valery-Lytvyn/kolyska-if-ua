"use client";
import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

interface SectionTitleProps {
  title: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  return (
    <motion.h2
      ref={ref}
      className={`${className} text-4xl md:text-5xl lg:text-6xl  text-balance font-bold text-primary py-2`}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
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

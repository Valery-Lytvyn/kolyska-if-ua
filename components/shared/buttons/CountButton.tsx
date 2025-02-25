"use client";
import React from "react";
import { motion } from "motion/react";

interface CountButtonProps {
  label: string;
  onClick: () => void;
}
const CountButton: React.FC<CountButtonProps> = ({ label, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="px-4 py-2 bg-secondary text-white rounded-lg w-10 h-10  focus:outline-none focus:ring-0 focus:ring-accent/50 hover:bg-accent-hover transition-colors flex justify-center items-center text-2xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
    >
      {label}
    </motion.button>
  );
};

export default CountButton;

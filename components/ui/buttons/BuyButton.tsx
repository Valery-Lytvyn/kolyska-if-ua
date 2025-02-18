"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface BuyButtonProps {
  onClick: () => void;
  styles?: string;
}
const BuyButton: React.FC<BuyButtonProps> = ({ onClick, styles }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.button
      className={`relative px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-0 focus:ring-accent/50   overflow-hidden z-10 ${styles}`}
      aria-label={`Додати товар до кошика`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        onClick();
      }}
    >
      <span className="relative z-10 ">Купити</span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 w-full h-full bg-accent-hover -z-0"
            initial={{ x: "-100%", scale: 1 }}
            animate={{ x: 1, scale: 1.05 }}
            exit={{ x: "-100%", scale: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {" "}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default BuyButton;

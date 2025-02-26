"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  buttonVariants,
  slideInLeftWithScale,
} from "@/lib/animations/animations";

interface BuyButtonProps {
  onClick: () => void;
  className?: string;
}
const BuyButton: React.FC<BuyButtonProps> = ({ onClick, className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.button
      className={`relative px-4 py-2 bg-secondary text-white rounded-lg focus:outline-none focus:ring-0 focus:ring-accent/50   overflow-hidden z-10 ${className}`}
      aria-label={`Додати товар до кошика`}
      {...buttonVariants}
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
            {...slideInLeftWithScale}
          >
            {" "}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default BuyButton;

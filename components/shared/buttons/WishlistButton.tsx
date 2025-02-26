"use client";
import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { buttonVariants } from "@/lib/animations/animations";

interface WishlistButtonProps {
  quantityWishedItems: number;
  onClick: () => void;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  quantityWishedItems,
  onClick,
}) => {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Wishlist"
      {...buttonVariants}
      className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors relative focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
    >
      <IoHeartOutline className="text-2xl" />
      {quantityWishedItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
          {quantityWishedItems}
        </span>
      )}
    </motion.button>
  );
};

export default WishlistButton;

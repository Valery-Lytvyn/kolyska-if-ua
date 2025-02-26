"use client";
import React from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { motion } from "motion/react";
import { buttonVariants } from "@/lib/animations/animations";

interface WishButtonProps {
  onToggleWishlist: () => void;
  isWished: boolean;
  className?: string;
}

const WishButton: React.FC<WishButtonProps> = ({
  onToggleWishlist,
  isWished,
  className = "",
}) => {
  return (
    <motion.button
      onClick={onToggleWishlist}
      aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
      {...buttonVariants}
      className={`w-12 h-12 text-accent hover:text-accent-hover transition-colors flex justify-center items-center focus:outline-none ${className}`}
    >
      {isWished ? (
        <IoHeart className="text-2xl" />
      ) : (
        <IoHeartOutline className="text-2xl" />
      )}
    </motion.button>
  );
};

export default WishButton;

import React from "react";
import { motion } from "motion/react";
import { IoCartOutline } from "react-icons/io5";
import { buttonVariants } from "@/lib/animations/animations";

interface CartButtonProps {
  quantityItemsInCart: number;
  onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({
  quantityItemsInCart,
  onClick,
}) => {
  return (
    <motion.button
      className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors relative"
      {...buttonVariants}
      aria-label="Cart"
      onClick={onClick}
    >
      <IoCartOutline className="text-2xl" />
      {!!quantityItemsInCart && (
        <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-5 h-5 flex justify-center items-center text-center">
          {quantityItemsInCart}
        </span>
      )}
    </motion.button>
  );
};

export default CartButton;

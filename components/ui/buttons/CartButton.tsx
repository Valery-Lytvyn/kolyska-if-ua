import React from "react";
import { motion } from "motion/react";
import { IoCartOutline } from "react-icons/io5";

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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Cart"
      onClick={onClick}
    >
      <IoCartOutline className="text-2xl" />
      {!!quantityItemsInCart && (
        <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">
          {quantityItemsInCart}
        </span>
      )}
    </motion.button>
  );
};

export default CartButton;

import { useRouter } from "next/navigation";
import React from "react";
import { motion } from "motion/react";
import { IoCartOutline } from "react-icons/io5";

const CartButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/cart");
  };

  return (
    <motion.button
      className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors relative"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Cart"
      onClick={handleClick}
    >
      <IoCartOutline className="text-2xl" />
      <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex justify-center items-center">
        3
      </span>
    </motion.button>
  );
};

export default CartButton;

import React from "react";
import { BiSearch } from "react-icons/bi";
import { motion } from "motion/react";
import { buttonVariants } from "@/lib/animations/animations";

const SearchButton: React.FC = () => {
  return (
    <motion.button
      className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
      {...buttonVariants}
      aria-label="Search"
      type="submit"
    >
      <BiSearch className="text-2xl" />
    </motion.button>
  );
};

export default SearchButton;

"use client";
import React from "react";
import { IoTrash } from "react-icons/io5";
import { motion } from "motion/react";
import { buttonVariants } from "@/lib/animations/animations";

interface DeleteButtonProps {
  label: string;
  onClick: () => void;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ label, onClick }) => {
  return (
    <motion.button
      className="w-full bg-red-500 text-white py-4 font-medium rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2 px-2"
      onClick={onClick}
      aria-label={label}
      {...buttonVariants}
    >
      <IoTrash className="text-lg" />
      {label}
    </motion.button>
  );
};

export default DeleteButton;

"use client";
import React from "react";
import CountButton from "./buttons/CountButton";
import { AnimatePresence, motion } from "motion/react";

interface CountButtonProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}
const Counter: React.FC<CountButtonProps> = ({
  count,
  increment,
  decrement,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <CountButton label="-" onClick={decrement} />
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="text-2xl font-semibold text-primary"
        >
          {count}
        </motion.span>
      </AnimatePresence>
      <CountButton label="+" onClick={increment} />
    </div>
  );
};

export default Counter;

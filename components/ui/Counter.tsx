"use client";
import React from "react";
import CountButton from "../shared/buttons/CountButton";
import { AnimatePresence, motion } from "motion/react";
import { fadeInUpShort } from "@/lib/animations/animations";

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
          {...fadeInUpShort}
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

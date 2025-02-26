import { slideInLeftQuick } from "@/lib/animations/animations";
import { AnimatePresence, motion } from "motion/react";
import React from "react";

interface AnimatedHintProps {
  isShowHint: boolean;
  text: string;
}

const AnimatedHint: React.FC<AnimatedHintProps> = ({ isShowHint, text }) => {
  return (
    <AnimatePresence>
      {isShowHint && (
        <motion.span
          className="px-4 py-2 bg-secondary text-white text-sm rounded-lg shadow-md"
          {...slideInLeftQuick}
        >
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default AnimatedHint;

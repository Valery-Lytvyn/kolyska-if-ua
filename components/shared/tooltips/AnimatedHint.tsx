import { AnimatePresence, motion } from "motion/react";
import React from "react";

interface AnimatedHintProps {
  isShowHint: boolean;
  text: string;
}

const AnimatedHint: React.FC<AnimatedHintProps> = ({ isShowHint, text }) => {
  const hintVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isShowHint && (
        <motion.span
          className="px-4 py-2 bg-secondary text-white text-sm rounded-lg shadow-md"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={hintVariants}
          transition={{ duration: 0.2 }}
        >
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default AnimatedHint;

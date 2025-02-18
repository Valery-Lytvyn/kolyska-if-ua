import React from "react";
import { AnimatePresence, motion } from "motion/react";

import { Transition } from "motion";

interface AnimatedWrapperProps {
  isVisible: boolean;
  children: React.ReactNode;
  initial?: Record<string, number | string> | string | string[] | false;
  animate?: Record<string, number | string> | string | string[];
  exit?: Record<string, number | string> | string | string[];
  transition?: Transition;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  isVisible,
  children,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  exit = { opacity: 0 },
  transition = { duration: 0.5 },
}) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          style={{ willChange: "transform, opacity" }}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default AnimatedWrapper;

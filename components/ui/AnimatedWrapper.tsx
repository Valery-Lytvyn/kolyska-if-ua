import React from "react";
import { AnimatePresence, motion } from "motion/react";

interface AnimatedWrapperProps {
  isVisible: boolean;
  children: React.ReactNode;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  isVisible,
  children,
}) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          style={{ willChange: "transform, opacity" }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default AnimatedWrapper;

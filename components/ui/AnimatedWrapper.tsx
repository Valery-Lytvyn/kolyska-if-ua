import React from "react";
import { AnimatePresence, motion } from "motion/react";
import { scaleUpWithExit } from "@/lib/animations/animations";

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
          {...scaleUpWithExit}
          className="w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default AnimatedWrapper;

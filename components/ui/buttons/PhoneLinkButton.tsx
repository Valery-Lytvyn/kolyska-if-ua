"use client";
import React from "react";
import { ImPhone } from "react-icons/im";
import { motion, AnimatePresence } from "framer-motion";

interface PhoneLinkButtonProps {
  onClick: () => void;
}

const PhoneLinkButton: React.FC<PhoneLinkButtonProps> = ({ onClick }) => {
  const [isShowHint, setIsShowHint] = React.useState(false);

  const hintVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  const buttonVariants = {
    start: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <div className="fixed bottom-8 left-8 flex items-center gap-2 z-50">
      {/* Animated Button */}
      <motion.button
        className="p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        onMouseEnter={() => setIsShowHint(true)}
        onMouseLeave={() => setIsShowHint(false)}
        onClick={onClick}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        aria-label="Ми Вам зателефонуємо"
      >
        <ImPhone className="text-2xl" />
      </motion.button>

      {/* Animated Hint */}
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
            Хочете, ми Вам
            <br /> зателефонуємо?
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhoneLinkButton;

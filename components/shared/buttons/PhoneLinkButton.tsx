"use client";
import React from "react";
import { ImPhone } from "react-icons/im";
import { motion } from "motion/react";
import AnimatedHint from "../tooltips/AnimatedHint";
import { buttonVariants } from "@/lib/animations/animations";

interface PhoneLinkButtonProps {
  onClick: () => void;
}

const PhoneLinkButton: React.FC<PhoneLinkButtonProps> = ({ onClick }) => {
  const [isShowHint, setIsShowHint] = React.useState(false);

  return (
    <div className="fixed bottom-8 left-8 flex items-center gap-2 z-50">
      {/* Animated Button */}
      <motion.button
        className="p-4 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        onMouseEnter={() => setIsShowHint(true)}
        onMouseLeave={() => setIsShowHint(false)}
        onClick={onClick}
        {...buttonVariants}
        aria-label="Ми Вам зателефонуємо"
      >
        <ImPhone className="text-2xl" />
      </motion.button>

      {/* Animated Hint */}
      <AnimatedHint isShowHint={isShowHint} text="Ми Вам зателефонуємо" />
    </div>
  );
};

export default PhoneLinkButton;

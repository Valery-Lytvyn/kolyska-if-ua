"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { IoIosArrowUp } from "react-icons/io";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-8 right-8 flex items-center gap-2 z-50 ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <motion.button
        className="p-3 bg-primary group text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors "
        onClick={scrollToTop}
        aria-label="Scroll to top"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
      >
        <IoIosArrowUp className="text-2xl group-hover:scale-125 transition-transform" />
      </motion.button>
    </div>
  );
};

export default React.memo(ScrollToTop);

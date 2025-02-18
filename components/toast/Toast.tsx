"use client";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ToastProps {
  message: string;
  isVisible: boolean;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-4 inset-x-0 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, easing: "easeInOut" }}
            className=" w-fit bg-primary  px-6 pt-4 pb-2 rounded-md shadow-md z-[500] flex  relative border-2 border-error"
          >
            <div className="text-white p-4 rounded-md ">{message}</div>
            {/* Close button */}
            <motion.button
              className="absolute top-1 right-1 text-white "
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <IoCloseOutline className="text-2xl font-bold" />
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Toast;

"use client";
import { ToastType } from "@/types/types";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";
import {
  IoCloseOutline,
  IoCheckmarkCircle,
  IoWarning,
  IoInformationCircle,
} from "react-icons/io5";

interface ToastProps {
  message: string;
  isVisible: boolean;
  duration?: number;
  onClose: () => void;
  type?: ToastType;
}

const Toast: React.FC<ToastProps> = ({
  message,
  isVisible,
  duration = 3000,
  onClose,
  type = "info",
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-green-500 border-green-600";
      case "error":
        return "bg-red-500 border-red-600";
      case "info":
        return "bg-blue-500 border-blue-600";
      default:
        return "bg-primary border-primary";
    }
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <IoCheckmarkCircle className="text-2xl" />;
      case "error":
        return <IoWarning className="text-2xl" />;
      case "info":
        return <IoInformationCircle className="text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-4 inset-x-0 flex justify-center z-50">
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3, easing: "easeInOut" }}
            className={`w-fit ${getToastStyles(
              type
            )} px-6 pt-2 pb-1 rounded-md shadow-md z-[500] flex items-center relative border-2`}
          >
            <div className="text-white p-4 rounded-md flex items-center">
              {getToastIcon(type)}
              <span className="ml-2">{message}</span>
            </div>
            {/* Close button */}
            <motion.button
              className="absolute top-1 right-1 text-white"
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

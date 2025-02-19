"use client";
import Toast from "@/components/toast/Toast";
import React, { createContext, useContext, useState } from "react";
import { ToastType } from "@/types/types";

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<{
    message: string;
    type?: ToastType;
    duration?: number;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const showToast = (message: string, type?: ToastType, duration?: number) => {
    setToast({ message, type, duration });
    setIsVisible(true);
  };

  const hideToast = () => {
    setIsVisible(false);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          isVisible={isVisible}
          duration={toast.duration}
          onClose={hideToast}
          type={toast.type}
        />
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

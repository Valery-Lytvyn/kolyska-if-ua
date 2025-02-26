"use client";
import React from "react";
import PhoneLinkButton from "../buttons/PhoneLinkButton";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "motion/react";
import ContactForm from "@/components/ui/ContactForm";
import { fadeIn, fadeInDown } from "@/lib/animations/animations";

const PhoneLinkModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const modalToggle = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      {/* Modal Trigger Button */}
      <PhoneLinkButton onClick={modalToggle} />

      {/* Modal Overlay and Content */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 p-4 z-[100] flex justify-center items-center"
            {...fadeIn}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-full max-w-md px-6 py-8 relative"
              {...fadeInDown}
            >
              {/* Close Button */}
              <button
                className="absolute top-1 right-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                onClick={modalToggle}
                aria-label="Закрити модальне вікно"
              >
                <IoClose className="text-2xl" />
              </button>

              <ContactForm modalToggle={modalToggle} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhoneLinkModal;

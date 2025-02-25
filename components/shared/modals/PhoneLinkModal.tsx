"use client";
import React from "react";
import CustomInput from "../inputs/CustomInput";
import CustomButton from "../buttons/CustomButton";
import { useForm } from "@/hooks/useForm";
import PhoneLinkButton from "../buttons/PhoneLinkButton";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const PhoneLinkModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { formData, handleChange } = useForm({
    name: "",
    phone: "",
    message: "",
  });

  const modalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsModalOpen(false);
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-full max-w-md px-6 pt-8 relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-1 right-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                onClick={modalToggle}
                aria-label="Закрити модальне вікно"
              >
                <IoClose className="text-2xl" />
              </button>

              {/* Form */}
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <CustomInput
                  type="text"
                  placeholder="Ваше Ім'я"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  aria-label="Ваше Ім'я"
                />
                <CustomInput
                  type="tel"
                  placeholder="Ваш номер телефону"
                  name="phone"
                  onChange={handleChange}
                  value={formData.phone}
                  aria-label="Ваш номер телефону"
                />
                <textarea
                  name="message"
                  id="message"
                  cols={30}
                  rows={5}
                  placeholder="Коментар"
                  aria-label="Коментар"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-accent transition-colors duration-200"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>

                <CustomButton name="Відправити" label="Відправити" />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhoneLinkModal;

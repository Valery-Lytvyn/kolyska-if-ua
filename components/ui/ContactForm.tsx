"use client";
import React, { useState } from "react";
import axios from "axios";
import { useForm } from "@/hooks/useForm";
import CustomInput from "../shared/inputs/CustomInput";
import CustomButton from "../shared/buttons/CustomButton";
import { useToast } from "@/providers/ToastContext";
import CustomTextarea from "../shared/inputs/CustomTextarea";
import ReCAPTCHA from "react-google-recaptcha";

const initialState = {
  phoneNumber: "",
  message: "",
};

interface ContactFormProps {
  modalToggle?: () => void;
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

const ContactForm: React.FC<ContactFormProps> = ({ modalToggle }) => {
  const {
    formData,
    setFormData,
    handleChange,
    errors,
    setErrors,
    validateForm,
  } = useForm(initialState);
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!recaptchaToken) {
      setErrors((prev) => ({
        ...prev,
        form: "Будь ласка, пройдіть reCAPTCHA",
      }));
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/message", {
        message: `Телефон: ${formData.phoneNumber}, \nПовідомлення: ${formData.message}`,
        recaptchaToken,
      });

      if (response.status === 200) {
        showToast("Повідомлення відправлено успішно!");
        setFormData({ phoneNumber: "", message: "" });
        if (modalToggle) modalToggle();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setErrors((prev) => ({ ...prev, form: error?.message as string }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-primary mb-4">
        Зв&apos;язатися з нами
      </h2>

      <CustomInput
        type="tel"
        placeholder="Введіть номер телефону"
        name="phoneNumber"
        label="Номер телефону"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={errors.phoneNumber}
      />

      <CustomTextarea
        placeholder="Введіть ваше повідомлення"
        name="message"
        label="Повідомлення"
        value={formData.message}
        onChange={handleChange}
        error={errors.message}
      />

      {/* reCAPTCHA */}
      <ReCAPTCHA
        sitekey={RECAPTCHA_SITE_KEY}
        onChange={handleRecaptchaChange}
      />

      {errors.form && <p className="text-error text-sm mt-1">{errors.form}</p>}

      <CustomButton
        name={loading ? "Відправлення..." : "Відправити"}
        label="Відправити повідомлення"
        disabled={loading}
      />
    </form>
  );
};

export default ContactForm;

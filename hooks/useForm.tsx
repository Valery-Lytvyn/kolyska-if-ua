import {
  validateConfirmPassword,
  validateEmail,
  validateMessage,
  validateName,
  validatePassword,
  validatePhoneNumber,
} from "@/lib/utils/validation";
import { useState, useCallback } from "react";

export const useForm = (initialState: Record<string, string>) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = ev.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((fieldName) => {
      switch (fieldName) {
        case "name":
          newErrors.name = validateName(formData.name) || "";
          break;
        case "phoneNumber":
          newErrors.phoneNumber =
            validatePhoneNumber(formData.phoneNumber) || "";
          break;
        case "message":
          newErrors.message = validateMessage(formData.message) || "";
          break;
        case "email":
          newErrors.email = validateEmail(formData.email) || "";
          break;
        case "password":
          newErrors.password = validatePassword(formData.password) || "";
          break;
        case "confirmPassword":
          newErrors.confirmPassword =
            validateConfirmPassword(
              formData.password,
              formData.confirmPassword
            ) || "";
        default:
          break;
      }
    });

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    validateForm,
  };
};

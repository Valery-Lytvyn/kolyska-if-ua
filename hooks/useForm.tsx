import { useState, useCallback } from "react";

export const useForm = (initialState: Record<string, string>) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = ev.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  return {
    formData,
    error,
    setError,
    handleChange,
  };
};

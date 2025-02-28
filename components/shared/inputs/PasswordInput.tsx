import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface PasswordInputProps {
  placeholder: string;
  name: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null | undefined;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder,
  name,
  label,
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label htmlFor={name} className="w-full text-sm text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          aria-label={label || name}
          className={`w-full h-10 border ${
            error ? "border-error" : "border-gray-300"
          } rounded-lg p-2 focus:outline-none focus:border-accent`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <IoEyeOffOutline className="text-lg text-secondary" />
          ) : (
            <IoEyeOutline className="text-lg text-secondary" />
          )}
        </button>
      </div>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
};

export default PasswordInput;

import React from "react";

interface CustomInputProps {
  type: "text" | "email" | "password" | "tel";
  placeholder: string;
  name: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CustomInput: React.FC<CustomInputProps> = ({
  type,
  placeholder,
  name,
  label,
  value = "",
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label htmlFor={name} className="w-full text-sm">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        aria-label={label || name}
        className="w-full h-10 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-500"
      />
    </div>
  );
};

export default CustomInput;

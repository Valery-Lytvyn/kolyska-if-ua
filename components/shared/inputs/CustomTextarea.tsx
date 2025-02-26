import React from "react";

interface CustomTextareaProps {
  placeholder: string;
  name: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  placeholder,
  name,
  label,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label htmlFor={name} className="w-full text-sm text-secondary">
          {label}
        </label>
      )}
      <textarea
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        aria-label={label || name}
        cols={30}
        rows={5}
        className={`w-full h-24 border ${
          error ? "border-error" : "border-gray-300"
        } rounded-lg p-2 focus:outline-none focus:border-accent resize-none`}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
};

export default CustomTextarea;

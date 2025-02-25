import React from "react";

interface CustomButtonProps {
  name: string;
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  name,
  label,
  disabled,
  onClick,
}) => {
  return (
    <button
      className={`w-full bg-accent text-white py-3 px-4 rounded-md text-center transition duration-300 ease hover:bg-accent-hover focus:scale-95 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-label={label}
      type="submit"
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default CustomButton;

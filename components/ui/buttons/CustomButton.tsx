import React from "react";

interface CustomButtonProps {
  name: string;
  label: string;
}
const CustomButton: React.FC<CustomButtonProps> = ({ name, label }) => {
  return (
    <button
      className="w-full  bg-primary text-white py-4 px-2 rounded-md text-center  transition duration-300 ease hover:bg-primary-hover my-4 focus:scale-95"
      aria-label={label}
      type="submit"
    >
      {name}
    </button>
  );
};

export default CustomButton;

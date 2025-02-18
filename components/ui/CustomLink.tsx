"use client";
import { motion } from "framer-motion";
import Link from "next/link";

interface CustomLinkProps {
  href: string;
  label: string;
  className?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  href,
  label,
  className = "",
}) => {
  return (
    <motion.div
      className={`flex justify-end my-8 ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        className={`flex items-center gap-2 text-accent text-xl px-6 py-3 
                    hover:text-accent-hover transition-colors duration-300 
                    font-bold rounded-lg border-2 border-accent 
                    hover:border-accent-hover bg-light-gray 
                    hover:bg-opacity-20 ${className}`}
        aria-label={label}
      >
        <span>← {label}</span>
      </Link>
    </motion.div>
  );
};

export default CustomLink;

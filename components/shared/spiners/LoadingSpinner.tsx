import React from "react";
import { motion } from "motion/react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <div className="flex gap-2">
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-accent rounded-full"
            initial={{ scale: 0.5, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 0.75,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;

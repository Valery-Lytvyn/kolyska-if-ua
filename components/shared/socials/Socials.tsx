import { SOCIALS } from "@/lib/data/constants";
import React from "react";

interface SocialsProps {
  className?: string;
}
const Socials: React.FC<SocialsProps> = ({ className }) => {
  return (
    <div className="flex gap-6 mt-4 justify-center">
      {SOCIALS.map(({ href, icon: IconComponent, label }) => (
        <a
          key={href}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconComponent className={`text-2xl ${className}`} />
        </a>
      ))}
    </div>
  );
};

export default Socials;

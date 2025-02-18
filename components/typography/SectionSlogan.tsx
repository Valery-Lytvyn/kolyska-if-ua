import React from "react";

interface SectionSloganProps {
  slogan: string;
}
const SectionSlogan: React.FC<SectionSloganProps> = ({ slogan }) => {
  return (
    <p className="mt-4 text-balance text-secondary text-xl md:text-2xl max-w-2xl mx-auto">
      {slogan}
    </p>
  );
};

export default SectionSlogan;

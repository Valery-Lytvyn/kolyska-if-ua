import Image from "next/image";
import React from "react";

interface ShopImageWithGradientProps {
  src: string;
  alt: string;
}
const ShopImageWithGradient: React.FC<ShopImageWithGradientProps> = ({
  src,
  alt,
}) => {
  return (
    <div className="relative h-[500px] w-full  rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        quality={75}
        loading="eager"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="w-full h-auto object-cover mx-auto rounded-lg shadow-md"
      />
      <div className="absolute inset-0 z-10  dark-bottom-gradient"></div>
    </div>
  );
};

export default ShopImageWithGradient;

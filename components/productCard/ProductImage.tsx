import Image from "next/image";
import React from "react";

interface ProductImageProps {
  imageUrl: string;
  productName: string;
  index: number;
}
const ProductImage: React.FC<ProductImageProps> = ({
  imageUrl,
  productName,
  index,
}) => {
  return (
    <Image
      src={imageUrl || "/fallback_image.webp"}
      alt={productName}
      fill
      quality={75}
      priority={index < 6}
      loading={index < 6 ? "eager" : "lazy"}
      className="transition-all duration-1000 object-contain transform-gpu group-hover:scale-105 h-auto w-full"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default ProductImage;

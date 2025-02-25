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
      width={800}
      height={600}
      quality={75}
      priority={index < 6}
      loading={index < 6 ? "eager" : "lazy"}
      className="h-full w-auto transition-all duration-1000 object-fill transform-gpu group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

export default ProductImage;

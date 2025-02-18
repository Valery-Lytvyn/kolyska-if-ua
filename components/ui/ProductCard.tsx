"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import BuyButton from "./buttons/BuyButton";
import { ProductCardProps } from "@/types/types";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/helpers/formatPrice";
import { useCart } from "@/hooks/useCart";

const ProductCard: React.FC<ProductCardProps> = ({
  index,
  productId,
  price,
  imageUrl,
  productName,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { handleAddToCart } = useCart();
  // const { showToast } = useToast();
  const formattedPrice = formatPrice(price || "");
  const handleAddToCartClick = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
      handleAddToCart({
        id: productId,
        name: productName,
        price: formattedPrice,
        quantity: 1,
        imageUrl: imageUrl,
      });

      // showToast("Додано до кошика");
    } catch (err) {
      console.error(err);
      // showToast("Failed to add product to cart.");
    }
  };

  return (
    <motion.article
      key={`${productId}-${index}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 h-full group w-full border border-transparent hover:border-accent-hover "
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
      layoutId={productId}
    >
      <Link
        href={`/product/${productId}`}
        className="flex flex-col h-full justify-between w-full"
      >
        {/* Image Section */}
        <figure className="relative h-60 w-full bg-white flex items-center justify-center overflow-hidden">
          <ProductImage
            imageUrl={imageUrl || ""}
            productName={productName}
            index={index}
          />
        </figure>

        {/* Content Section */}
        <motion.section
          className="p-4 flex flex-col justify-between flex-1 bg-white relative overflow-hidden z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {productName}
          </h3>
          <div className="flex justify-between items-center">
            <motion.span
              className="text-xl font-bold text-primary"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              {formattedPrice}
              {" грн"}
            </motion.span>
            <BuyButton onClick={handleAddToCartClick} />
          </div>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 w-full h-full light-gradient  -z-0"
                initial={{ y: "100%" }}
                animate={{ y: 1 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
          </AnimatePresence>
        </motion.section>
      </Link>
    </motion.article>
  );
};

export default ProductCard;

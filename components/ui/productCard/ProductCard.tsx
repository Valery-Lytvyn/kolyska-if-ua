"use client";
import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import BuyButton from "../buttons/BuyButton";
import { ProductCardProps } from "@/types/types";
import ProductImage from "../ProductImage";
import { formatPrice } from "@/helpers/formatPrice";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/providers/ToastContext";
import WishButton from "../buttons/WishButton";
import useWishlist from "@/hooks/useWishlist";

const ProductCard: React.FC<ProductCardProps> = ({
  index,
  productId,
  price,
  imageUrl,
  productName,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { handleAddToCart } = useCart();
  const { showToast } = useToast();
  const { isWished, handleToggleWishlist } = useWishlist(productId);

  const formattedPrice = formatPrice(price || "");

  const handleAddToCartClick = useCallback(async () => {
    try {
      handleAddToCart({
        id: productId,
        name: productName,
        price: formattedPrice,
        quantity: 1,
        imageUrl: imageUrl,
      });
      showToast("Додано до кошика", "success");
    } catch (err) {
      console.error(err);
      showToast("Помилка при додаванні до кошика.");
    }
  }, [
    formattedPrice,
    handleAddToCart,
    imageUrl,
    productId,
    productName,
    showToast,
  ]);
  return (
    <motion.article
      // key={`${productId}-${index}`}
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
      // layoutId={productId}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 h-full flex group w-full border min-h-[480px] border-transparent hover:border-accent-hover relative"
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
      {/* Wish Button */}
      <div className="absolute top-0 right-0">
        <WishButton
          onToggleWishlist={handleToggleWishlist}
          isWished={isWished}
          className="text-2xl"
        />
      </div>
    </motion.article>
  );
};

export default ProductCard;

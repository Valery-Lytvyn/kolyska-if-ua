"use client";
import React, { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import Link from "next/link";
import BuyButton from "../shared/buttons/BuyButton";
import { ProductCardProps } from "@/types/types";
import ProductImage from "./ProductImage";
import { formatPrice, transformStringToNumber } from "@/helpers/formatPrice";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/providers/ToastContext";
import WishButton from "../shared/buttons/WishButton";
import useWishlist from "@/hooks/useWishlist";
import { slideInBottom } from "@/lib/animations/animations";

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
  const ref = useRef(null);
  const isInView = useInView(ref);

  const formattedPrice = transformStringToNumber(price || "");

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
      showToast("Помилка при додаванні до кошика.", "error");
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
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300  flex group w-full border h-full border-transparent hover:border-accent-hover relative"
    >
      <Link
        href={`/product/${productId}`}
        className="flex flex-col h-full justify-between w-full"
      >
        {/* Image Section */}
        <figure className="relative h-[360px] w-full bg-white flex items-center justify-center overflow-hidden">
          <ProductImage
            imageUrl={imageUrl || ""}
            productName={productName}
            index={index}
          />
        </figure>

        {/* Content Section */}
        <motion.section
          className="p-4 flex flex-col flex-1 bg-white relative overflow-hidden z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex justify-between items-center pb-4">
            <motion.span
              ref={ref}
              className="text-xl md:text-2xl font-bold text-primary"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              {formatPrice(formattedPrice)}
              {" грн"}
            </motion.span>
            <BuyButton onClick={handleAddToCartClick} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 pb-4">
            {productName}
          </h3>

          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 w-full h-full light-gradient  -z-0"
                {...slideInBottom}
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
          aria-label={
            isWished
              ? `Видалити ${productName} зі списку бажань`
              : `Додати ${productName} до списку бажань`
          }
        />
      </div>
    </motion.article>
  );
};

export default React.memo(ProductCard);

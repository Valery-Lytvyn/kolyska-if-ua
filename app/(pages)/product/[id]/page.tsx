"use client";
import React, { useEffect, useState, useCallback } from "react";
import BuyButton from "@/components/ui/buttons/BuyButton";
import Counter from "@/components/ui/Counter";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { selectProductById } from "@/store/slices/catalogSlice";
import { useCounter } from "@/hooks/useCounter";
import ProductImage from "@/components/ui/ProductImage";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import { formatPrice } from "@/helpers/formatPrice";
import { useCart } from "@/hooks/useCart";
import { addViewedProduct } from "@/store/slices/viewedProductsSlice";
import WishButton from "@/components/ui/buttons/WishButton";
import useWishlist from "@/hooks/useWishlist";

const ProductPage = () => {
  const { count, increment, decrement } = useCounter(1, 1, 9);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { handleAddToCart } = useCart();
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const productId = params?.id;

  const product = useSelector((state: RootState) =>
    selectProductById(state, productId as string)
  );

  const { isWished, handleToggleWishlist } = useWishlist(productId);

  useEffect(() => {
    if (productId) {
      dispatch(addViewedProduct(productId));
    }
  }, [dispatch, productId]);

  const {
    price,
    picture: imageUrl,
    name: productName,
    description,
  } = product || {};

  const toggleDescription = useCallback(() => {
    setIsDescriptionExpanded((prev) => !prev);
  }, []);

  const handleAddToCartClick = useCallback(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
      handleAddToCart({
        id: productId as string,
        name: productName as string,
        price: formatPrice(price || ""),
        quantity: count,
        imageUrl: imageUrl as string,
      });
      // showToast("Додано до кошика");
    } catch (err) {
      console.error(err);
      // showToast("Failed to add product to cart.");
    }
  }, [count, handleAddToCart, imageUrl, price, productId, productName]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-13rem)] w-full bg-light-gray">
        <p className="text-secondary text-lg">На жаль товар не знайдено.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 bg-light-gray min-h-[calc(100vh-13rem)]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl w-full bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden group"
      >
        <header className="bg-primary text-white py-6 px-6 text-center space-y-6">
          <h1 className="text-2xl font-bold text-balance">{productName}</h1>
          <div className="w-full flex justify-between items-center">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-accent text-xl px-6 py-3 
                    hover:text-accent-hover transition duration-300 
                    font-bold rounded-lg border-2 border-accent 
                    hover:scale-105 bg-light-gray 
                    hover:bg-opacity-20"
            >
              ← Продовжити покупки
            </button>
            <WishButton
              onToggleWishlist={handleToggleWishlist}
              isWished={isWished}
              className="text-4xl"
            />
          </div>
        </header>
        <div className="flex-col md:flex-row flex overflow-hidden">
          {/* Image Section */}
          <div className="w-full h-96 relative sm:h-[30rem] flex-1 flex justify-center items-center">
            <ProductImage
              imageUrl={imageUrl || ""}
              productName={productName || ""}
              index={0}
            />
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-6 flex-1">
            <p className="text-3xl font-semibold text-accent">
              {formatPrice(price || "")} {" грн"}
            </p>

            {/* Description with Expand/Collapse */}
            {!!description && (
              <div className="space-y-2">
                <p
                  className={`text-lg text-secondary ${
                    !isDescriptionExpanded ? "line-clamp-3" : ""
                  }`}
                >
                  {description}
                </p>
                <button
                  onClick={toggleDescription}
                  className="flex items-center text-accent hover:text-accent-hover transition-colors duration-300"
                >
                  {isDescriptionExpanded ? (
                    <>
                      <span>Show Less</span>
                      <IoChevronUpCircleOutline className="w-5 h-5 ml-1" />
                    </>
                  ) : (
                    <>
                      <span>Read More</span>
                      <IoChevronDownCircleOutline className="w-5 h-5 ml-1" />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Counter */}
            <div className="flex items-center space-x-4">
              <Counter
                count={count}
                increment={increment}
                decrement={decrement}
              />
            </div>

            {/* Buy Button */}
            <div className="mt-6">
              <BuyButton
                onClick={handleAddToCartClick}
                className="w-40 text-xl"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductPage;

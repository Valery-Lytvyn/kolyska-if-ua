"use client";
import React, { useEffect, useState, useCallback } from "react";
import BuyButton from "@/components/shared/buttons/BuyButton";
import Counter from "@/components/ui/Counter";
import { motion } from "motion/react";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { selectProductById } from "@/store/slices/catalogSlice";
import { useCounter } from "@/hooks/useCounter";
import ProductImage from "@/components/productCard/ProductImage";
import {
  IoChevronDownCircleOutline,
  IoChevronUpCircleOutline,
} from "react-icons/io5";
import { formatPrice, transformStringToNumber } from "@/helpers/formatPrice";
import { useCart } from "@/hooks/useCart";
import { addViewedProduct } from "@/store/slices/viewedProductsSlice";
import WishButton from "@/components/shared/buttons/WishButton";
import useWishlist from "@/hooks/useWishlist";
import { useToast } from "@/providers/ToastContext";
import Loader from "@/app/loading";
import { scaleUpSlow } from "@/lib/animations/animations";

const ProductPage = () => {
  const { count, increment, decrement } = useCounter(1, 1, 9);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { handleAddToCart } = useCart();
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams<{ id: string }>();
  const productId = params?.id;
  const { showToast } = useToast();

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

  const formattedPrice = transformStringToNumber(price || "");

  const handleAddToCartClick = useCallback(async () => {
    try {
      handleAddToCart({
        id: productId as string,
        name: productName as string,
        price: formattedPrice,
        quantity: count,
        imageUrl: imageUrl as string,
      });
      showToast("Додано до кошика", "success");
    } catch (err) {
      console.error(err);
      showToast("Помилка при додаванні до кошика.");
    }
  }, [
    formattedPrice,
    count,
    handleAddToCart,
    imageUrl,
    productId,
    productName,
    showToast,
  ]);

  if (!product) {
    return <Loader />;
  }

  return (
    <main className="flex items-center justify-center p-4 bg-light-gray min-h-[calc(100vh-10.5rem)] sm:min-h-[calc(100vh-11.5rem)] md:min-h-[calc(100vh-13rem)]">
      <motion.div
        {...scaleUpSlow}
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
          <div className="w-full min-h-[40rem] relative  flex-1 flex justify-center items-center">
            <ProductImage
              imageUrl={imageUrl || "/fallback_image.webp"}
              productName={productName || ""}
              index={0}
            />
          </div>

          {/* Content Section */}
          <div className="p-8 space-y-6 flex-1">
            <p className="text-3xl font-semibold text-accent">
              {formatPrice(formattedPrice)} {" грн"}
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
                      <span>Показати менше</span>
                      <IoChevronUpCircleOutline className="w-5 h-5 ml-1" />
                    </>
                  ) : (
                    <>
                      <span>Показати більше</span>
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
    </main>
  );
};

export default ProductPage;

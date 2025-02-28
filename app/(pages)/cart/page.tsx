"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/providers/ToastContext";
import { useCart } from "@/hooks/useCart";
import Loader from "../../loading";
import axios from "axios";
import { scaleUpSlow } from "../../../lib/animations/animations";
import EmptyCartState from "@/components/cart/EmptyCartState";
import CartFooter from "@/components/cart/CartFooter";
import CartItemList from "@/components/cart/CartItemList";
import CartHeader from "@/components/cart/CartHeader";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

const CartPage = () => {
  const {
    cartItems,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleClearCart,
  } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const { showToast } = useToast();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemoveItem = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);
      try {
        handleRemoveFromCart(id);
      } catch (err) {
        console.error(err);
        setError("Помилка видалення з кошика.");
      } finally {
        setIsLoading(false);
      }
    },
    [handleRemoveFromCart]
  );

  const handleUpdateItemQuantity = useCallback(
    async (id: string, quantity: number) => {
      setIsLoading(true);
      setError(null);
      try {
        if (quantity === 0) {
          handleRemoveFromCart(id);
        } else {
          handleUpdateQuantity(id, quantity);
        }
      } catch (err) {
        console.error(err);
        setError("Помилка оновлення кількості.");
      } finally {
        setIsLoading(false);
      }
    },
    [handleUpdateQuantity, handleRemoveFromCart]
  );

  const handlePlaceAnOrder = useCallback(
    async (phoneNumber: string) => {
      setIsLoading(true);
      setError(null);

      if (!recaptchaToken) {
        setError("Будь ласка, підтвердіть, що ви не робот.");
        setIsLoading(false);
        return;
      }

      try {
        const message = cartItems
          .map(
            (item) =>
              `${item.name} - ${item.quantity} шт. x ${item.price} грн = ${
                item.quantity * item.price
              } грн`
          )
          .join("\n");

        const response = await axios.post("/api/message", {
          message: `Телефон: ${phoneNumber}, \nТовари:\n${message}`,
          recaptchaToken,
        });

        if (response.status === 200) {
          showToast(
            `Замовлення прийнято! \n
Найближчим часом з Вами \n
 зв'яжеться менеджер.`,
            "info",
            4000
          );
          handleClearCart();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error(error);
        setError(error?.message || "Помилка оформлення замовлення.");
      } finally {
        setIsLoading(false);
      }
    },
    [cartItems, handleClearCart, showToast, recaptchaToken]
  );

  useEffect(() => {
    if (error) {
      showToast(error);
    }
  }, [error, showToast]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="flex items-center justify-center p-4 bg-light-gray min-h-[calc(100vh-10.5rem)] sm:min-h-[calc(100vh-11.5rem)] md:min-h-[calc(100vh-13rem)]">
      <motion.div
        {...scaleUpSlow}
        className="w-full max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      >
        <CartHeader />
        {cartItems.length > 0 ? (
          <>
            <CartItemList
              cartItems={cartItems}
              handleRemoveItem={handleRemoveItem}
              handleUpdateItemQuantity={handleUpdateItemQuantity}
            />
            <CartFooter
              totalAmount={totalAmount}
              handleClearCart={handleClearCart}
              handlePlaceAnOrder={handlePlaceAnOrder}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={(token) => setRecaptchaToken(token)}
            />
          </>
        ) : (
          <EmptyCartState />
        )}
      </motion.div>
    </section>
  );
};

export default React.memo(CartPage);

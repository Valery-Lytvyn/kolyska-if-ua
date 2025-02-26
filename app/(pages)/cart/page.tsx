"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { IoTrashOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import { useToast } from "@/providers/ToastContext";
import { useCart } from "@/hooks/useCart";
import { ROUTES } from "@/routes/routes";
import Counter from "@/components/ui/Counter";
import DeleteButton from "@/components/shared/buttons/DeleteButton";
import ProductImage from "@/components/productCard/ProductImage";
import Loader from "../../loading";
import CustomInput from "@/components/shared/inputs/CustomInput";
import axios from "axios";
import { validatePhoneNumber } from "@/lib/utils/validation";
import { scaleUp, scaleUpSlow } from "../../../lib/animations/animations";
import { formatPrice } from "@/helpers/formatPrice";
interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

const CartPage = () => {
  const {
    cartItems,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleClearCart,
  } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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
      try {
        const message = cartItems
          .map(
            (item) =>
              `${item.name} - ${item.quantity} шт. x ${item.price} грн = ${
                item.quantity * item.price
              } грн}`
          )
          .join("\n");

        const response = await axios.post("/api/message", {
          message: `Телефон: ${phoneNumber}, \nТовари:\n${message}`,
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
    [cartItems, handleClearCart, showToast]
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
            />
          </>
        ) : (
          <EmptyCartState />
        )}
      </motion.div>
    </section>
  );
};

const CartHeader = React.memo(() => (
  <header className="bg-primary text-white py-6 px-6 text-center">
    <h2 className="text-2xl font-bold">Ваш кошик</h2>
    <Link
      href={ROUTES.catalog}
      className="mt-2 inline-block text-sm text-accent hover:text-accent/80 transition duration-200"
    >
      ← Продовжити покупки
    </Link>
  </header>
));
CartHeader.displayName = "CartHeader";

const CartItemList = React.memo(
  ({
    cartItems,
    handleRemoveItem,
    handleUpdateItemQuantity,
  }: {
    cartItems: CartItem[];
    handleRemoveItem: (id: string) => void;
    handleUpdateItemQuantity: (id: string, quantity: number) => void;
  }) => (
    <div className="p-6">
      <div className="space-y-6 w-full">
        {cartItems.map(({ name, id, imageUrl, quantity, price }, index) => (
          <CartItemCard
            key={`${id}-${index}`}
            id={id}
            name={name}
            imageUrl={imageUrl}
            quantity={quantity}
            price={price}
            handleRemoveItem={handleRemoveItem}
            handleUpdateItemQuantity={handleUpdateItemQuantity}
          />
        ))}
      </div>
    </div>
  )
);
CartItemList.displayName = "CartItemList";

const CartItemCard = React.memo(
  ({
    id,
    name,
    imageUrl,
    quantity,
    price,
    handleRemoveItem,
    handleUpdateItemQuantity,
  }: CartItem & {
    handleRemoveItem: (id: string) => void;
    handleUpdateItemQuantity: (id: string, quantity: number) => void;
  }) => (
    <motion.div
      {...scaleUp}
      className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-6 last:border-b-0 w-full"
    >
      <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden relative">
        <ProductImage imageUrl={imageUrl || ""} productName={name} index={0} />
      </div>
      <div className="flex-1 text-center sm:text-left overflow-hidden">
        <p className="text-lg font-semibold text-primary truncate whitespace-normal">
          {name}
        </p>
        <p className="text-secondary text-lg mt-1">
          {formatPrice(price)} {" грн"}
        </p>
      </div>
      <div className="flex items-center gap-4 flex-shrink-0">
        <Counter
          count={quantity}
          increment={() => handleUpdateItemQuantity(id, quantity + 1)}
          decrement={() => handleUpdateItemQuantity(id, quantity - 1)}
        />
        <button
          className="text-secondary hover:text-error transition duration-200"
          onClick={() => handleRemoveItem(id)}
          aria-label="Remove Item"
        >
          <IoTrashOutline className="text-3xl" />
        </button>
      </div>
    </motion.div>
  )
);
CartItemCard.displayName = "CartItemCard";

const EmptyCartState = React.memo(() => (
  <div className="text-center py-12">
    <FiShoppingCart className="mx-auto text-secondary" size={64} />
    <p className="text-secondary text-lg mt-4">Ваш кошик порожній.</p>
    <Link
      href={ROUTES.catalog}
      className="mt-4 inline-block bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors duration-200"
    >
      Продовжити покупки
    </Link>
  </div>
));
EmptyCartState.displayName = "EmptyCartState";

const CartFooter = React.memo(
  ({
    totalAmount,
    handleClearCart,
    handlePlaceAnOrder,
  }: {
    totalAmount: number;
    handleClearCart: () => void;
    handlePlaceAnOrder: (value: string) => void;
  }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState<string | null | undefined>(
      null
    );

    const handlePhoneChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      const value = ev.target.value;
      setPhoneNumber(value);
      setPhoneError(validatePhoneNumber(value) as string);
    };

    return (
      <footer className="bg-gray-50 p-6 space-y-2">
        <div className="flex justify-between items-center mb-6">
          <span className="text-lg font-semibold text-gray-800">Разом:</span>
          <span className="text-xl font-bold text-accent">
            {formatPrice(totalAmount)}
            {" грн"}
          </span>
        </div>
        <div className="flex justify-end">
          <div className="w-full sm:w-1/2 sm:pl-2">
            <CustomInput
              label="Щоб зробити замовлення, введіть номер телефону для зв'язку з Вами."
              type="tel"
              name="phone"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Номер Вашого телефону"
              error={phoneError}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 my-4">
          <DeleteButton label="Очистити кошик" onClick={handleClearCart} />
          <motion.button
            whileHover={{ scale: phoneNumber && !phoneError ? 1.02 : 1 }}
            whileTap={{ scale: phoneNumber && !phoneError ? 0.98 : 1 }}
            type="button"
            className="w-full bg-accent text-white py-4 font-medium rounded-lg hover:bg-accent/90 transition duration-200"
            aria-label="Оформити замовлення"
            disabled={!phoneNumber || phoneError !== null}
            onClick={() => handlePlaceAnOrder(phoneNumber)}
          >
            Оформити замовлення
          </motion.button>
        </div>
      </footer>
    );
  }
);

CartFooter.displayName = "CartFooter";

export default React.memo(CartPage);

"use client";
import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { IoTrashOutline } from "react-icons/io5";
import Counter from "@/components/ui/Counter";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import DeleteButton from "@/components/ui/buttons/DeleteButton";

import { useToast } from "@/providers/ToastContext";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { PAGE_NUMBER } from "@/lib/contants";
import { useCart } from "@/hooks/useCart";

const Cart = () => {
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
    (id: string) => {
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
    (id: string, quantity: number) => {
      setIsLoading(true);
      setError(null);
      try {
        handleUpdateQuantity(id, quantity);
      } catch (err) {
        console.error(err);
        setError("Помилка оновлення кількості.");
      } finally {
        setIsLoading(false);
      }
    },
    [handleUpdateQuantity]
  );

  if (error) {
    showToast(error);
  }

  return (
    // <div className="flex items-center justify-center p-4 bg-light-gray min-h-[calc(100vh-13rem)]">
    //   <motion.div
    //     initial={{ scale: 0.8, opacity: 0 }}
    //     animate={{ scale: 1, opacity: 1 }}
    //     transition={{ duration: 0.5 }}
    //     className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
    //   >
    //     {/* Header */}
    //     <header className="bg-primary text-white py-6 px-6 text-center">
    //       <h2 className="text-2xl font-bold">Ваш кошик</h2>
    //       <Link
    //         href={`/catalog/${PAGE_NUMBER}`}
    //         className="mt-2 inline-block text-sm text-accent hover:text-accent/80 transition duration-200"
    //       >
    //         ← Продовжити покупки
    //       </Link>
    //     </header>
    //     {!isLoading ? (
    //       <>
    //         {/* Items List */}
    //         <div className="p-6">
    //           {cartItems.length > 0 ? (
    //             <div className="space-y-6">
    //               {cartItems.map((item) => (
    //                 <motion.div
    //                   key={item.id}
    //                   initial={{ opacity: 0, scale: 0.8 }}
    //                   animate={{ opacity: 1, scale: 1 }}
    //                   transition={{ duration: 0.3 }}
    //                   className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-6 last:border-b-0"
    //                 >
    //                   {/* Product Image */}
    //                   <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
    //                     {/* <ProductImage
    //         imageUrl={imageUrl || ""}
    //         productName={productName}
    //         index={index}
    //       /> */}
    //                   </div>

    //                   {/* Product Name and Price */}
    //                   <div className="flex-1 text-center sm:text-left">
    //                     <p className="text-lg font-semibold text-primary truncate">
    //                       {item.name}
    //                     </p>
    //                     <p className="text-secondary mt-1">200 грн</p>
    //                   </div>

    //                   {/* Quantity Counter */}
    //                   <div className="flex items-center gap-4">
    //                     <Counter
    //                       count={item.quantity}
    //                       increment={() =>
    //                         handleUpdateQuantity(item.id, item.quantity + 1)
    //                       }
    //                       decrement={() =>
    //                         handleUpdateQuantity(
    //                           item.id,
    //                           Math.max(1, item.quantity - 1)
    //                         )
    //                       }
    //                     />
    //                   </div>

    //                   {/* Remove Item Button */}
    //                   <button
    //                     className="text-secondary hover:text-error transition duration-200"
    //                     onClick={() => handleRemoveItem(item.id)}
    //                     aria-label="Remove Item"
    //                   >
    //                     <IoTrashOutline className="text-2xl" />
    //                   </button>
    //                 </motion.div>
    //               ))}
    //             </div>
    //           ) : (
    //             // Empty Cart State
    //             <div className="text-center py-12">
    //               <FiShoppingCart
    //                 className="mx-auto text-secondary"
    //                 size={64}
    //               />
    //               <p className="text-secondary text-lg mt-4">
    //                 Ваш кошик порожній.
    //               </p>
    //               <Link
    //                 href="/catalog"
    //                 className="mt-4 inline-block bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors duration-200"
    //               >
    //                 Продовжити покупки
    //               </Link>
    //             </div>
    //           )}
    //         </div>

    //         {/* Footer */}
    //         {cartItems.length > 0 && (
    //           <footer className="bg-gray-50 p-6">
    //             {/* Total Amount */}
    //             <div className="flex justify-between items-center mb-6">
    //               <span className="text-lg font-semibold text-gray-800">
    //                 Разом:
    //               </span>
    //               <span className="text-xl font-bold text-accent">
    //                 ${totalAmount.toFixed(2)}
    //               </span>
    //             </div>

    //             <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
    //               {/* Empty Cart Button */}
    //               <DeleteButton
    //                 label="Очистити кошик"
    //                 onClick={handleClearCart}
    //               />
    //               {/* Checkout Button */}
    //               <motion.button
    //                 whileHover={{ scale: 1.02 }}
    //                 whileTap={{ scale: 0.98 }}
    //                 type="button"
    //                 className="w-full bg-accent text-white py-4 font-medium rounded-lg hover:bg-accent/90 transition duration-200"
    //                 aria-label="Оформити замовлення"
    //               >
    //                 Оформити замовлення
    //               </motion.button>
    //             </div>
    //           </footer>
    //         )}
    //       </>
    //     ) : (
    //       <LoadingSpinner />
    //     )}
    //   </motion.div>
    // </div>
    <div className="flex items-center justify-center p-4 bg-light-gray min-h-[calc(100vh-13rem)]">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      >
        {/* Header */}
        <header className="bg-primary text-white py-6 px-6 text-center">
          <h2 className="text-2xl font-bold">Ваш кошик</h2>
          <Link
            href={`/catalog/${PAGE_NUMBER}`}
            className="mt-2 inline-block text-sm text-accent hover:text-accent/80 transition duration-200"
          >
            ← Продовжити покупки
          </Link>
        </header>
        {!isLoading ? (
          <>
            {/* Items List */}
            <div className="p-6">
              {cartItems.length > 0 ? (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b pb-6 last:border-b-0"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
                        {/* <ProductImage imageUrl={imageUrl || ""} productName={productName} index={index} /> */}
                      </div>

                      {/* Product Name and Price */}
                      <div className="flex-1 text-center sm:text-left">
                        <p className="text-lg font-semibold text-primary truncate">
                          {item.name}
                        </p>
                        <p className="text-secondary mt-1">200 грн</p>
                      </div>

                      {/* Quantity Counter */}
                      <div className="flex items-center gap-4">
                        <Counter
                          count={item.quantity}
                          increment={() =>
                            handleUpdateItemQuantity(item.id, item.quantity + 1)
                          }
                          decrement={() =>
                            handleUpdateItemQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                        />
                      </div>

                      {/* Remove Item Button */}
                      <button
                        className="text-secondary hover:text-error transition duration-200"
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label="Remove Item"
                      >
                        <IoTrashOutline className="text-2xl" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // Empty Cart State
                <div className="text-center py-12">
                  <FiShoppingCart
                    className="mx-auto text-secondary"
                    size={64}
                  />
                  <p className="text-secondary text-lg mt-4">
                    Ваш кошик порожній.
                  </p>
                  <Link
                    href="/catalog"
                    className="mt-4 inline-block bg-accent text-white px-6 py-2 rounded-lg hover:bg-accent/90 transition-colors duration-200"
                  >
                    Продовжити покупки
                  </Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <footer className="bg-gray-50 p-6">
                {/* Total Amount */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-gray-800">
                    Разом:
                  </span>
                  <span className="text-xl font-bold text-accent">
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-2 mb-4">
                  {/* Empty Cart Button */}
                  <DeleteButton
                    label="Очистити кошик"
                    onClick={handleClearCart}
                  />
                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full bg-accent text-white py-4 font-medium rounded-lg hover:bg-accent/90 transition duration-200"
                    aria-label="Оформити замовлення"
                  >
                    Оформити замовлення
                  </motion.button>
                </div>
              </footer>
            )}
          </>
        ) : (
          <LoadingSpinner />
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(Cart);

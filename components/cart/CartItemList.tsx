import React from "react";
import CartItemCard from "./CartItemCard";
import { CartItem } from "@/types/types";

interface CartItemList {
  cartItems: CartItem[];
  handleRemoveItem: (id: string) => void;
  handleUpdateItemQuantity: (id: string, quantity: number) => void;
}

const CartItemList: React.FC<CartItemList> = ({
  cartItems,
  handleRemoveItem,
  handleUpdateItemQuantity,
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
);

export default React.memo(CartItemList);

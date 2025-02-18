import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "@/store/slices/cartSlice";
import { useCallback } from "react";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleAddToCart = useCallback(
    (item: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      imageUrl: string;
    }) => {
      dispatch(addToCart(item));
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  const handleUpdateQuantity = useCallback(
    (id: string, quantity: number) => {
      dispatch(updateQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {
    cartItems,
    handleAddToCart,
    handleRemoveFromCart,
    handleUpdateQuantity,
    handleClearCart,
  };
};

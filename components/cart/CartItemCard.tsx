import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import Counter from "../ui/Counter";
import { formatPrice } from "@/helpers/formatPrice";
import ProductImage from "../productCard/ProductImage";
import { scaleUp } from "@/lib/animations/animations";
import { motion } from "motion/react";

interface CartItemCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  handleRemoveItem: (id: string) => void;
  handleUpdateItemQuantity: (id: string, quantity: number) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  id,
  name,
  imageUrl,
  quantity,
  price,
  handleRemoveItem,
  handleUpdateItemQuantity,
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
);
export default React.memo(CartItemCard);

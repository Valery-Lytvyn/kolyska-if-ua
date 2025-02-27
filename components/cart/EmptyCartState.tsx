import { ROUTES } from "@/routes/routes";
import Link from "next/link";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";

const EmptyCartState: React.FC = () => (
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
);

export default React.memo(EmptyCartState);

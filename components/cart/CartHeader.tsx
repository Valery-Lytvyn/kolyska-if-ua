import { ROUTES } from "@/routes/routes";
import Link from "next/link";
import React from "react";

const CartHeader: React.FC = () => (
  <header className="bg-primary text-white py-6 px-6 text-center">
    <h2 className="text-2xl font-bold">Ваш кошик</h2>
    <Link
      href={ROUTES.catalog}
      className="mt-2 inline-block text-sm text-accent hover:text-accent/80 transition duration-200"
    >
      ← Продовжити покупки
    </Link>
  </header>
);
export default React.memo(CartHeader);

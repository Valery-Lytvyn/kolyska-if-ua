"use client";
import SectionTitle from "@/components/typography/SectionTitle";
import CustomLink from "@/components/shared/links/CustomLink";
import WishedProductList from "@/components/wishedProductList/WishedProductList";
import { ROUTES } from "@/routes/routes";
import { selectOffersByIds } from "@/store/slices/catalogSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const WishedProductsPage: React.FC = () => {
  const wishedProducts = useSelector(
    (state: RootState) => state.wishedProducts.wishedProductIds
  );
  const products = useSelector((state: RootState) =>
    selectOffersByIds(state, wishedProducts)
  );

  return (
    <div className="w-full h-full p-4 bg-white min-h-[calc(100vh-10.5rem)] sm:min-h-[calc(100vh-11.5rem)] md:min-h-[calc(100vh-13rem)] mx-auto flex flex-col items-center">
      {!products.length ? (
        <div>
          <SectionTitle title="Зараз ваш список порожній." />
          <CustomLink href={ROUTES.home} label="Повернутися на головну" />
        </div>
      ) : (
        <WishedProductList products={products} />
      )}
    </div>
  );
};

export default WishedProductsPage;

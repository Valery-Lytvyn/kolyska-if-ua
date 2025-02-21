"use client";
import Loader from "@/app/loading";
import SectionTitle from "@/components/typography/SectionTitle";
import CustomLink from "@/components/ui/CustomLink";
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
  if (!!products.length) {
    return <Loader />;
  }
  return (
    <div className="w-full h-full p-4 bg-white min-h-[calc(100vh-13rem)] mx-auto">
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

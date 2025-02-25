"use client";
import ProductListSkeleton from "@/components/productList/ProductListSkeleton";
import SectionSlogan from "@/components/typography/SectionSlogan";
import SectionTitle from "@/components/typography/SectionTitle";
import ProductCard from "@/components/productCard/ProductCard";
import { selectOffersByIds } from "@/store/slices/catalogSlice";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const BestOffers: React.FC = () => {
  const newOffers = useSelector((state: RootState) => state.catalog.bestOffers);
  const offers = useSelector((state: RootState) =>
    selectOffersByIds(state, newOffers)
  );
  return (
    <main className="bg-white min-h-[calc(100vh-13rem)]">
      <section className="w-full max-w-7xl p-4 mx-auto flex flex-col">
        {/* Section Title with Slogan */}
        <div className="mt-12 mb-8 text-center">
          <SectionTitle title="Наші новинки" />
          <SectionSlogan
            slogan=" Відкрийте для себе найсвіжіші пропозиції, які ми підготували
            спеціально для вас."
          />
        </div>
        <div className="w-full mx-auto">
          {/* Products List */}
          {offers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
              {offers
                .filter((offer) => offer.price !== "0.00")
                .map(({ $: { id }, price, picture, name }, index) => (
                  <ProductCard
                    key={id}
                    index={index}
                    productId={id}
                    price={price}
                    imageUrl={picture}
                    productName={name}
                  />
                ))}
            </div>
          ) : (
            <ProductListSkeleton />
          )}
        </div>
      </section>
    </main>
  );
};

export default React.memo(BestOffers);

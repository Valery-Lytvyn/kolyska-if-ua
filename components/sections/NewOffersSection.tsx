"use client";
import React from "react";
import SectionTitle from "../typography/SectionTitle";
import ProductCard from "../ui/productCard/ProductCard";
import Slider from "../slider/Slider";
import CustomLink from "../ui/CustomLink";
import SectionSlogan from "../typography/SectionSlogan";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { selectOffersByIds } from "@/store/slices/catalogSlice";
import ProductListSkeleton from "../productList/ProductListSkeleton";

const NewOffersSection: React.FC = () => {
  const newOffers = useSelector((state: RootState) => state.catalog.bestOffers);
  const offers = useSelector((state: RootState) =>
    selectOffersByIds(state, newOffers)
  );

  return (
    <section className="w-full mx-auto  min-h-screen bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full -z-0 opacity-30">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="var(--color-secondary-accent)"
            d="M41.5,-44.9C53.7,-39.3,63.5,-26.1,62.4,-13.7C61.3,-1.4,49.4,10.1,41.5,24.1C33.6,38.1,29.7,54.5,18.3,65C6.9,75.6,-11.9,80.1,-21.6,71.4C-31.3,62.7,-31.7,40.6,-34,25.2C-36.3,9.7,-40.5,0.9,-38.8,-6.5C-37,-13.9,-29.4,-19.9,-22,-26.5C-14.5,-33,-7.3,-40,3.7,-44.4C14.7,-48.8,29.3,-50.6,41.5,-44.9Z"
            transform="translate(150 20)"
          />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 -z-0 dots-container overflow-hidden">
        <div className="dots w-full h-full"></div>
      </div>

      {/* Content */}
      <div className="w-full max-w-7xl p-4 mx-auto flex flex-col relative z-10">
        {/* Section Title with Slogan */}
        <div className="mt-12 mb-8 text-center">
          <SectionTitle title="Наші новинки" />
          <SectionSlogan
            slogan=" Відкрийте для себе найсвіжіші пропозиції, які ми підготували
            спеціально для вас."
          />
        </div>
        {/* New Offers Link */}
        <CustomLink href="/new-offers" label="Переглянути всі новинки" />

        {/* Slider */}
        {!!offers.length ? (
          <Slider
            slides={offers.filter((offer) => offer.price !== "0.00")}
            renderSlide={({ $: { id }, price, picture, name }, index) => (
              <ProductCard
                key={id}
                index={index}
                productId={id}
                price={price}
                imageUrl={picture}
                productName={name}
              />
            )}
          />
        ) : (
          <ProductListSkeleton />
        )}
      </div>
    </section>
  );
};

export default NewOffersSection;

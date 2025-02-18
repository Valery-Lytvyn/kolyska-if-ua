"use client";
import React from "react";
import SectionTitle from "../typography/SectionTitle";
import ProductCard from "../ui/ProductCard";
import CustomLink from "../ui/CustomLink";
import SectionSlogan from "../typography/SectionSlogan";
import Loader from "@/app/loading";
import useOffers from "@/hooks/useOffers";

const BestOffersSection: React.FC = () => {
  const { offers, loading, error } = useOffers("bestOffer");

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full mx-auto relative z-20 bg-white">
      <div className="w-full max-w-7xl p-4  mx-auto flex flex-col  relative  z-20">
        {/* Section Title with Slogan */}
        <div className="mt-12 mb-8 text-center">
          <SectionTitle title="Найкращі пропозиції" />
          <SectionSlogan
            slogan=" Оберіть найвигідніші пропозиції та насолоджуйтесь ексклюзивними
            знижками!"
          />
        </div>
        {/* New Offers Link */}
        <CustomLink href="/best-offers" label="Переглянути всі пропозиції" />
        <div className="w-full  mx-auto">
          {/* Products List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
            {!!offers.length &&
              offers
                .filter((offer) => offer.price !== "0.00")
                .map(({ $: { id }, price, picture, name }, index) => (
                  <ProductCard
                    key={index}
                    index={index}
                    productId={id}
                    price={price}
                    imageUrl={picture}
                    productName={name}
                  />
                ))}
          </div>
        </div>
      </div>
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-[calc(100vh/3*2)] -z-0">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="var(--color-accent)"
            d="M39.4,-64C51,-61.6,60.3,-50.9,58.4,-38.8C56.6,-26.8,43.4,-13.4,39,-2.6C34.5,8.3,38.7,16.5,34.8,18.4C30.8,20.3,18.7,15.9,11.6,18.3C4.4,20.7,2.2,29.9,-4.6,37.8C-11.4,45.7,-22.7,52.4,-25.9,47.7C-29,43,-23.9,26.9,-24.3,17.1C-24.7,7.2,-30.7,3.6,-37.1,-3.7C-43.5,-11,-50.3,-22,-48.7,-29.8C-47.1,-37.7,-37.2,-42.5,-27.7,-46.1C-18.2,-49.7,-9.1,-52.1,2.4,-56.3C13.9,-60.5,27.8,-66.4,39.4,-64Z"
            transform="translate(20 40)"
          />
        </svg>
      </div>
      <div className="absolute inset-y-0 right-0 w-full h-full -z-0  overflow-hidden">
        <div className="wiggle w-full h-full"></div>
      </div>
    </div>
  );
};

export default BestOffersSection;

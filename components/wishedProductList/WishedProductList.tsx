"use client";

import React from "react";

import ProductCard from "../productCard/ProductCard";
import CustomLink from "../shared/links/CustomLink";
import SectionTitle from "../typography/SectionTitle";
import { Offer } from "@/types/types";
import { ROUTES } from "@/routes/routes";

interface WishedProductListProps {
  products: Offer[];
}

const WishedProductList: React.FC<WishedProductListProps> = ({ products }) => {
  return (
    <>
      {products && !!products?.length && (
        <section className="w-full mx-auto border-t">
          <div className="w-full max-w-7xl p-4  mx-auto flex flex-col  relative z-20">
            <SectionTitle title="Товари, які вам сподобались." />
            <CustomLink href={ROUTES.home} label="Повернутися на головну" />
            {/* Products List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
              {products
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
        </section>
      )}
    </>
  );
};

export default WishedProductList;

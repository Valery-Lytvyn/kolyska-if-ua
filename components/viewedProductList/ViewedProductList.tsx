import React from "react";
import ProductCard from "../productCard/ProductCard";
import CustomLink from "../shared/links/CustomLink";
import { Offer } from "@/types/types";

interface ViewedProductListProps {
  linkHref: string;
  linkLabel: string;
  products: Offer[];
}

const ViewedProductList: React.FC<ViewedProductListProps> = ({
  linkHref,
  linkLabel,
  products,
}) => {
  return (
    <div className="w-full max-w-7xl p-4  mx-auto flex flex-col  relative z-20">
      <h3 className="text-xl md:text-2xl lg:text-3xl  text-balance font-bold text-primary py-2 text-left">
        Раніше переглянуті товари.
      </h3>

      <CustomLink href={linkHref} label={linkLabel} />

      {/* Products List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {products &&
          !!products.length &&
          products.map(({ $: { id }, price, picture, name }, index) => (
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
  );
};

export default ViewedProductList;

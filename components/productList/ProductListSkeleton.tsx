import React from "react";
import ProductCardSkeleton from "../productCard/ProductCardSkeleton";

const ProductListSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
      {[1, 2, 3, 4].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductListSkeleton;

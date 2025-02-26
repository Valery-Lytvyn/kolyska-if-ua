"use client";
import React, { lazy, Suspense } from "react";
import Loader from "./loading";
const HeroSection = lazy(() => import("@/components/sections/HeroSection"));
const NewOffersSection = lazy(
  () => import("@/components/sections/NewOffersSection")
);
const CatalogSection = lazy(
  () => import("@/components/sections/CatalogSection")
);
const BestOffersSection = lazy(
  () => import("@/components/sections/BestOffersSection")
);
const ShopBlurbSection = lazy(
  () => import("@/components/sections/ShopBlurbSection")
);
const ViewedProductsSection = lazy(
  () => import("@/components/sections/ViewedProductsSection")
);

const Home: React.FC = React.memo(() => {
  console.log("HomePage");
  return (
    <main className="flex-1 bg-gray-50">
      <HeroSection />
      <Suspense fallback={<Loader />}>
        <NewOffersSection />
        <CatalogSection />
        <BestOffersSection />
        <ShopBlurbSection />
        <ViewedProductsSection />
      </Suspense>
    </main>
  );
});
Home.displayName = "Home";
export default Home;

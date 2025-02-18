import BestOffers from "@/components/sections/BestOffersSection";
import CatalogSection from "@/components/sections/CatalogSection";
import HeroSection from "@/components/sections/HeroSection";
import NewOffersSection from "@/components/sections/NewOffersSection";
import ShopBlurbSection from "@/components/sections/ShopBlurbSection";

export default function Home() {
  return (
    <main className="flex-1 ">
      <HeroSection />
      <NewOffersSection />
      <CatalogSection />
      <BestOffers />
      <ShopBlurbSection />
    </main>
  );
}

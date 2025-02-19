import { useSelector } from "react-redux";
import { Offer } from "@/types/types";
import { RootState } from "@/store/store";
import { selectOffersByIds } from "@/store/slices/catalogSlice";

export const useViewedProducts = () => {
  const viewedProductIds = useSelector(
    (state: RootState) => state.viewedProducts.viewedProductIds
  );
  const products = useSelector((state: RootState) =>
    selectOffersByIds(state, viewedProductIds)
  );
  return products.filter((offer: Offer) => offer.price !== "0.00");
};

import {
  addWishedProduct,
  removeWishedProduct,
  selectWishedProductIds,
} from "@/store/slices/wishedProductsSlice";
import { RootState } from "@/store/store";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const useWishlist = (productId: string | undefined) => {
  const dispatch = useDispatch();

  const isWished = useSelector((state: RootState) =>
    productId ? selectWishedProductIds(state, productId) : false
  );

  const handleToggleWishlist = useCallback(() => {
    if (productId) {
      if (isWished) {
        dispatch(removeWishedProduct(productId));
      } else {
        dispatch(addWishedProduct(productId));
      }
    }
  }, [dispatch, isWished, productId]);

  return {
    isWished,
    handleToggleWishlist,
  };
};

export default useWishlist;

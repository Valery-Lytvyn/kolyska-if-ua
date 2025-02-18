"use client";
import {
  selectOffersByIds,
  setError,
  setLoading,
} from "@/store/slices/catalogSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type OfferType = "bestOffer" | "newOffer";

const useOffers = (offerType: OfferType) => {
  const dispatch: AppDispatch = useDispatch();
  const [productIds, setProductIds] = useState<string[]>([""]);
  const offers = useSelector((state: RootState) =>
    selectOffersByIds(state, productIds)
  );
  const { loading, error } = useSelector((state: RootState) => state.catalog);

  useEffect(() => {
    const fetchOffers = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch("/api/adminData");
        if (!response.ok) throw new Error(`Failed to fetch ${offerType}`);
        const data = await response.json();

        setProductIds(data[offerType]);
      } catch (err) {
        dispatch(setError((err as Error).message));
        console.error(`Error fetching ${offerType}:`, err);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchOffers();
  }, [dispatch, offerType]);

  return { offers, loading, error };
};

export default useOffers;

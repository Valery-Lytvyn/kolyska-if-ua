import { useState, useCallback } from "react";

export const useCounter = (initialValue = 1, min = 1, max = Infinity) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prevCount) => Math.min(prevCount + 1, max));
  }, [max]);

  const decrement = useCallback(() => {
    setCount((prevCount) => Math.max(prevCount - 1, min));
  }, [min]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    increment,
    decrement,
    reset,
  };
};

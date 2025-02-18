import { useEffect } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: Handler
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking the ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    // Add event listeners
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    // Clean up event listeners on unmount
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

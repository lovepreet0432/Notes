import { useRef, useCallback, useEffect } from "react";

export const useCustomDebounce = (fn, delay = 300) => {
  const timerRef = useRef(null);

  const debouncefn = useCallback((...args) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      fn(...args); // call the function with arguments
    }, delay);
  }, [fn, delay]);

  // Optional: cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { debouncefn };
};

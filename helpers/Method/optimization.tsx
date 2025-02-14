import { useEffect, useState } from "react";

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(handler); // Clear timeout on value change or unmount
  }, [value, delay]);

  return debouncedValue;
};
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): T => {
  let timer: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }) as T;
};
 
 
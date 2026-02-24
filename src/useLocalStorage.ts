import { useState } from "react";
export function useLocalStorage<T>(key: string, init: T): [T, (v: T) => void] {
  const [val, setVal] = useState<T>(() => {
    try { const item = localStorage.getItem(key); return item ? JSON.parse(item) : init; }
    catch { return init; }
  });
  const set = (v: T) => { setVal(v); localStorage.setItem(key, JSON.stringify(v)); };
  return [val, set];
}

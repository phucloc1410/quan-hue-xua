import { useState, useEffect } from 'react';

export default function useLocalStorage(khoa, giaTriDau) {
  const [giaTri, setGiaTri] = useState(() => {
    try {
      const item = localStorage.getItem(khoa);
      return item !== null ? JSON.parse(item) : giaTriDau;
    } catch {
      return giaTriDau;
    }
  });

  useEffect(() => {
    localStorage.setItem(khoa, JSON.stringify(giaTri));
  }, [khoa, giaTri]);

  return [giaTri, setGiaTri];
}

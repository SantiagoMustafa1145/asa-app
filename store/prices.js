import { create } from "zustand";

const usePrice = create((set) => ({
  reventas: 1000,
  ventas: 1500,
  total: 0,
  setReventas: (newPrice) => {
    set(() => ({
      reventas: newPrice,
    }));
  },
  setVentas: (newPrice) => {
    set(() => ({
      ventas: newPrice,
    }));
  },
  setTotal: (newTotal) => {
    set(() => ({
      total: newTotal,
    }));
  },
}));

export default usePrice;

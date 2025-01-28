import { create } from "zustand";

const usePrice = create((set) => ({
  negocio: 800,
  local: 1300,
  setNegocio: (newPrice) => {
    if (newPrice !== negocio) {
      set((state) => ({
        negocio: newPrice,
      }));
    }
  },
  setLocal: (newPrice) => {
    if (newPrice !== local) {
      set((state) => ({
        local: newPrice,
      }));
    }
  },
}));

export default usePrice;

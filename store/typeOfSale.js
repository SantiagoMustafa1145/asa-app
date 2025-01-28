import { create } from "zustand";

const useTypeOfSale = create((set) => ({
  type: "consumidor",
  changeType: () => {
    if (type === "consumidor") {
      set(() => ({
        type: "revendedor",
      }));
    } else {
      set(() => ({
        type: "consumidor",
      }));
    }
  },
}));

export default useTypeOfSale;

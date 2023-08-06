import { create } from "zustand";

interface IAppState {
  bears: number;
  increasePopulation: VoidFunction;
  removeAllBears: VoidFunction;
}

const useBearStore = create<IAppState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

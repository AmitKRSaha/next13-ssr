'use client'

// import { create } from 'zustand'
import { createWithEqualityFn } from 'zustand/traditional'

interface BearState {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
}

// const useBearStore = create<BearState>((set) => ({
//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
// }))

const useBearStore = createWithEqualityFn<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

export default useBearStore;
'use client'

// import { create } from 'zustand'
import { createWithEqualityFn } from 'zustand/traditional';

interface IPhotoDetail{
    url: string,
    title: string,
    id: number,
    description: string
}

interface IPhoto{
    photos: Array<IPhotoDetail>
}

interface PhotoState {
  photo: IPhoto
  setPhoto: () => void
}


const useTodoStore = createWithEqualityFn<PhotoState>((set) => ({
  photo: {photos: []},
  setPhoto: () => set((state) => ({ photo: state.photo })),
}))

export default useTodoStore;
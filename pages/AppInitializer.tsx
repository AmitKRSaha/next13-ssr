'use client'
import React, { FC } from "react";
import useTodoStore from '@/store/ssrStore'

interface IPhoto {
    photos: []
}

interface Props {
    photos: IPhoto
    children: React.ReactNode;
}

const AppInitializer = ({ photos, children }: Props) => {
    useTodoStore.setState({
        photo: photos,
    })

    return children
}

export default AppInitializer;

// export default function AppInitializer({ photos, children }) {
//     useTodoStore.setState({
//         photo: photos,
//     })

//     return children
// }
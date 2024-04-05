'use client'
import React from "react";
import useBearStore from '../store/store'

const Bear = () => {

    const { bears, increasePopulation, removeAllBears } = useBearStore()
    console.log(bears);
    return (
        <>
            <div>
                <p className="mb-2">{bears}</p>
                <button type="button" onClick={increasePopulation} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">One Up</button>
                <button type="button" onClick={removeAllBears} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">CLear Up</button>

            </div>

        </>

    )
}

export default Bear;
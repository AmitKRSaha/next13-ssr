import React,{useState, useEffect} from "react";

const Name = () => {
    const [name, setName] = useState([{'name': 'Error Boundary Check'}]);
    return <>
        <span>{name[0].name}</span>
        <br></br>
        <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900" onClick={() => setName([])}>Change Name</button>
    </>


}

export default Name
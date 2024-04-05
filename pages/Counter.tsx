import React,{useState, useEffect} from "react";

const Name = () => {
    const [name, setName] = useState([{'name': 'test'}]);
    return <>
        <span>{name[0].name}</span>
        <br></br>
        <button onClick={() => setName([])}>Change Name</button>
    </>


}

export default Name
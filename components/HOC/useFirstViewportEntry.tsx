import React, { useRef, useState, useEffect, RefObject } from "react";

const useViewPortEntry = (ref: RefObject<Element>, observeroptions: any) => {
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if(!element) return;
        
        const observer = new IntersectionObserver(([entry]) => {
            setEntered(entry.isIntersecting);
        }, observeroptions);

        observer.observe(element);

        return () => observer.disconnect();

    }, [observeroptions, ref])

    return entered;
}

export default useViewPortEntry;
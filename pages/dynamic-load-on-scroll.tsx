import React, {useRef, useState, useEffect} from "react";
import dynamic from 'next/dynamic';

import styles from '@/styles/DynamicLoad.module.css';
import RenderOnViewportEntry from "@/components/HOC/RenderOnViewportEntry";

const DynamicBear = dynamic(() => import('../components/Bear'), {
    ssr: false,
})

const DynamicLoad = () => {

    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef(null as HTMLElement | null); //(null as HTMLElement | null)
    const [styleVal, setStyleVal] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { rootMargin: "-300px" }
        );
        console.log(isIntersecting);
        if (ref.current == null) return;

        observer.observe(ref.current);

        return () => observer.disconnect();
    }, [isIntersecting]);

    useEffect(() => {
        // if (ref.current == null) return;

        if (isIntersecting) {
            setStyleVal(true);
        } else {
            setStyleVal(false);
        }
    }, [isIntersecting]);

    return (
        <div className={`${styles.App}`}>
            <header className={`${styles.Header}`} >This is the Header</header>
            <main ref={ref} className={`${styles.Main}`} >
                <div className={`${styles.childOne} ${styleVal ? styles.slideIn : ''}`}>Child One</div>
                <div className={`${styles.childTwo} ${styleVal ? styles.slideIn : ''}`}>Child Two</div>
                
                {/* {styleVal ?? <DynamicBear />} */}
                {/* <RenderOnViewportEntry threshold={0.25} className={`${styles.slideIn}`}>
                    <DynamicBear />
                </RenderOnViewportEntry> */}
            </main>
            <footer className={`${styles.Footer}`} >This is the Footer</footer>
        </div>
    )
}

export default DynamicLoad;
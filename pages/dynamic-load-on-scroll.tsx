import React, { useRef, useState, useEffect, ReactElement, RefObject } from "react";
import dynamic from 'next/dynamic';

import styles from '@/styles/DynamicLoad.module.css';
import Bear from "../components/Bear";

const DynamicBear = dynamic(() => import('../components/Bear'), {
    ssr: false,
})

interface Args extends IntersectionObserverInit {
    freezeOnceVisible?: boolean;
}

function useIntersectionObserver(
    elementRef: RefObject<Element>,
    {
        threshold = 0,
        root = null,
        rootMargin = "0%",
        freezeOnceVisible = false,
    }: Args
): IntersectionObserverEntry | undefined {
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    const frozen = entry?.isIntersecting && freezeOnceVisible;

    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    };

    const stableThreshold = Array.isArray(threshold)
        ? threshold.join(";")
        : threshold;

    useEffect(() => {
        const node = elementRef?.current;
        const hasIOSupport = !!window.IntersectionObserver;

        if (!hasIOSupport || frozen || !node) return;

        const inputThreshold =
            typeof stableThreshold === "string"
                ? stableThreshold.split(";").map(Number)
                : stableThreshold;

        const observerParams = { threshold: inputThreshold, root, rootMargin };
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        return () => observer.disconnect();
    }, [elementRef, stableThreshold, root, rootMargin, frozen]);

    return entry;
}

const RenderWithWindowIntersection = ({
    children,
}: {
    children: ({ visible }: { visible: boolean }) => ReactElement;
}) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const entry = useIntersectionObserver(ref, {});
    const visible = Boolean(entry?.isIntersecting);

    return (
        <div ref={ref}>
            <>{children({ visible })}</>
        </div>
    );
};

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

            </main>
            <RenderWithWindowIntersection>
                {({ visible }) => {
                    return <>{visible ? <DynamicBear /> : null}</>;
                }}
            </RenderWithWindowIntersection>
            <footer className={`${styles.Footer}`} >This is the Footer</footer>
        </div>
    )
}

export default DynamicLoad;
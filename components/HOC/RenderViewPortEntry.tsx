import React, { Suspense, useRef, ReactNode } from "react";
import useViewPortEntry from "./useFirstViewportEntry";

interface Props {
    children?: ReactNode
    threshold: number
    root: any
    rootMargin: string
    // any props that come into the component
}

const RenderOnViewportEntry = ({
    children,
    threshold = 0,
    root = null,
    rootMargin = "-100px", // the observer function will trigger when 300 pixels of the observed element have come into view.
    ...wrapperDivProps
}: Props) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const entered = useViewPortEntry(ref, {threshold, root,rootMargin})

    return (
        <div ref={ref} {...wrapperDivProps} >
            {entered && <Suspense fallback={<div>loading</div>}>
                {children}
                </Suspense>}

        </div>
    )

}

export default RenderOnViewportEntry;
import type { RefObject } from "react";
import { useEffect, useRef } from "react";

export const useObserver = (ref: RefObject<HTMLDivElement>, isLoading: boolean, callback: () => void) => {
    const observer = useRef<any>();

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        const cb = function (entries: any, observer: any) {
            if (entries[0].isIntersecting) {
                callback()
            }
        };
        observer.current = new IntersectionObserver(cb);
        observer.current!.observe(ref.current)
    }, [isLoading])
}
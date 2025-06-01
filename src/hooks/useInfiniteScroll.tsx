import { useEffect } from "react";
import type { RefObject } from "react";

export const useInfiniteScroll = (
    ref: RefObject<HTMLElement | null> ,
    callback: () => void,
    deps: unknown[] = []
) => {
    useEffect(() => {
        const element = ref.current;
        if(!element) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    callback();
                }
            },
            { threshold: 0.01 }
        );
        observer.observe(element);
        return () => {
            observer.disconnect();
        };
    }, deps);
};

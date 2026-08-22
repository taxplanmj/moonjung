'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 숫자가 from에서 target까지 움직이는 카운트 애니메이션 (오르거나 내려갈 수 있음).
 * 화면에 보일 때마다(스크롤로 벗어났다가 다시 들어와도) 매번 재생됩니다.
 */
export function useCountUp(target: number, duration = 2000, from = 0) {
    const [count, setCount] = useState(from);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let frameId: number;
        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

        const runAnimation = () => {
            cancelAnimationFrame(frameId);
            setCount(from);
            let startTime: number;
            const step = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                setCount(Math.round(from + (target - from) * easeOutQuart(progress)));
                if (progress < 1) {
                    frameId = requestAnimationFrame(step);
                }
            };
            frameId = requestAnimationFrame(step);
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    runAnimation();
                } else {
                    cancelAnimationFrame(frameId);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(frameId);
        };
    }, [target, duration, from]);

    return { count, ref };
}

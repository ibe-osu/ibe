"use client";

import { useEffect, useRef } from "react";

/**
 * Counts the element's number up from zero the first time it scrolls into
 * view. The final value is in the DOM from the start; motion-averse
 * visitors and bots simply never see it change.
 */
export function useCountUp<T extends HTMLElement>(target: string, duration = 1400) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const match = target.match(/^([^0-9]*)([0-9.]+)(.*)$/);
    if (!match) return;
    const [, prefix, num, suffix] = match;
    const end = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = `${prefix}${(end * eased).toFixed(decimals)}${suffix}`;
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return ref;
}

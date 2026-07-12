"use client";

import { useEffect } from "react";
import { getImageProps } from "next/image";
import welcomeImg from "../../../public/welcome.jpeg";
import welcomeVerticalImg from "../../../public/welcome-vertical.jpeg";
import aboutImg from "../../../public/about.jpg";
import alumniImg from "../../../public/alumni.jpg";
import recruitmentWelcomeImg from "../../../public/recruitment/welcome.jpeg";

const heroes = [
  welcomeImg,
  welcomeVerticalImg,
  aboutImg,
  alumniImg,
  recruitmentWelcomeImg,
].map(
  (src) =>
    getImageProps({ src, alt: "", sizes: "100vw" }).props as {
      src: string;
      srcSet?: string;
      sizes?: string;
    },
);

/**
 * Warms the browser cache for every page banner once the current page has
 * finished loading, so client-side navigation shows heroes instantly instead
 * of popping them in. Renders nothing.
 */
export default function HeroPrefetch() {
  useEffect(() => {
    let cancelled = false;

    const warm = () => {
      if (cancelled) return;
      heroes.forEach(({ src, srcSet, sizes }) => {
        const img = new window.Image();
        if (sizes) img.sizes = sizes;
        if (srcSet) img.srcset = srcSet;
        img.src = src;
      });
    };

    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(warm, { timeout: 3000 });
      } else {
        setTimeout(warm, 1500);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
    };
  }, []);

  return null;
}

"use client";

import { useRef } from "react";
import { Box, type SxProps, type Theme } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: React.ReactNode;
  /**
   * "rise"     — the wrapper fades in and rises as one unit (default)
   * "stagger"  — direct children fade in and rise one after another
   * "scale"    — the wrapper fades in with a gentle scale, for imagery
   */
  variant?: "rise" | "stagger" | "scale";
  /** Extra delay in seconds after the trigger fires */
  delay?: number;
  /**
   * CSS selector for the elements to stagger (variant "stagger" only).
   * Defaults to the wrapper's direct children.
   */
  targets?: string;
  sx?: SxProps<Theme>;
}

/**
 * Scroll-triggered reveal. Content is fully visible without JavaScript;
 * GSAP only sets the from-state at mount, so nothing is ever gated on the
 * animation firing. Respects prefers-reduced-motion.
 */
export default function Reveal({
  children,
  variant = "rise",
  delay = 0,
  targets,
  sx,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      // Skip animation for reduced-motion users and for hidden tabs /
      // headless renderers, where rAF is throttled and a gsap.from would
      // leave content stuck at its from-state.
      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.hidden
      ) {
        return;
      }

      // 92%, not 85%: on a phone 15% of the viewport is ~130px, so the
      // marker of a section could sit on screen for a full thumb-scroll
      // with its text still invisible. Firing as soon as the element
      // clears the bottom edge keeps the reveal without the blank band.
      const scrollTrigger = {
        trigger: el,
        start: "top 92%",
        once: true,
      };

      // clearProps removes GSAP's inline styles once the reveal finishes so
      // CSS hover transitions on the revealed elements keep working.
      if (variant === "stagger") {
        const items = targets ? el.querySelectorAll(targets) : el.children;
        gsap.from(items, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          // Cap the total stagger: ten cards at 0.09s each left the last
          // ones invisible for almost a second after the trigger fired.
          stagger: { amount: Math.min(0.09 * items.length, 0.5) },
          delay,
          clearProps: "opacity,transform",
          scrollTrigger,
        });
      } else if (variant === "scale") {
        gsap.from(el, {
          scale: 0.96,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay,
          clearProps: "opacity,transform",
          scrollTrigger,
        });
      } else {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay,
          clearProps: "opacity,transform",
          scrollTrigger,
        });
      }
    },
    { scope: ref, dependencies: [variant, delay, targets] },
  );

  return (
    <Box ref={ref} sx={sx}>
      {children}
    </Box>
  );
}

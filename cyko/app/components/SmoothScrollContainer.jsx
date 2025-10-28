/** @format */

"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScrollContainer({ children, className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const lenis = new Lenis({
        wrapper: containerRef.current,
        content: containerRef.current,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: true,
        touchMultiplier: 2,
      });

      let rafId;
      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);

      return () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
        lenis.destroy();
      };
    }
  }, []);

  return (
    <div ref={containerRef} className={className} data-lenis-prevent>
      {children}
    </div>
  );
}

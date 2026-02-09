"use client";

import { useEffect, useRef, useState } from "react";
import Name from "./Name";
import VideoBackground from "./VideoBackground";

export default function HeroSection() {
  const hasAutoScrolled = useRef(false);
  const scrollLockRef = useRef(false);
  const shutterTimeoutRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isOverlay, setIsOverlay] = useState(false);
  const [isShuttered, setIsShuttered] = useState(false);

  useEffect(() => {
    const target = document.getElementById("timeline");

    const triggerShutter = () => {
      if (!target || hasAutoScrolled.current) return;
      hasAutoScrolled.current = true;
      setIsShuttered(true);
      setIsOverlay(true);
      target.scrollIntoView({ behavior: "auto", block: "start" });
      shutterTimeoutRef.current = window.setTimeout(() => {
        setIsOverlay(false);
      }, 700);
    };

    const resetShutter = () => {
      setIsShuttered(false);
      setIsOverlay(false);
      hasAutoScrolled.current = false;
    };

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      const lastY = lastScrollYRef.current;
      lastScrollYRef.current = y;
      const goingDown = y > lastY + 1;
      const heroHeight = sectionRef.current?.offsetHeight ?? window.innerHeight;

      if (scrollLockRef.current) return;

      if (y <= 2) {
        resetShutter();
        return;
      }

      if (!hasAutoScrolled.current && goingDown && y < 120) {
        scrollLockRef.current = true;
        requestAnimationFrame(() => {
          triggerShutter();
          setTimeout(() => {
            scrollLockRef.current = false;
          }, 800);
        });
        return;
      }

      if (hasAutoScrolled.current && !goingDown && y < heroHeight) {
        resetShutter();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (shutterTimeoutRef.current) window.clearTimeout(shutterTimeoutRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden z-0">
      <div
        className={isOverlay ? "fixed inset-0 z-30" : "absolute inset-0"}
        style={{
          transformOrigin: "top",
          transform: isShuttered ? "scaleY(0)" : "scaleY(1)",
          transition: "transform 700ms cubic-bezier(0.2, 0.7, 0.2, 1)",
          willChange: "transform",
        }}
      >
        {/* Background video */}
        <VideoBackground />

        {/* Dark overlay */}
        <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />

        {/* Foreground content */}
        <Name />

        {/* Arrow head icon */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/90">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6 14l6-6 6 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

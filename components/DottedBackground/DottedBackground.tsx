"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./DottedBackground.module.css";

type DottedBackgroundProps = {
  className?: string;
  children?: React.ReactNode;
  backgroundColor?: string;
  dotColor?: string;
  dotRadius?: number;
  dotSpacing?: number;
  repelRadius?: number;
  repelStrength?: number;
  returnForce?: number;
  friction?: number;
};

type Dot = {
  x0: number;
  y0: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const DEFAULTS = {
  backgroundColor: "#ffffff",
  dotColor: "#8C8C8C",
  dotRadius: 0.7,
  dotSpacing: 12,
  repelRadius: 140,
  repelStrength: 3,
  returnForce: 0.08,
  friction: 0.86,
};

const ACTIVE_FPS = 60;
const IDLE_FPS = 30;
const IDLE_GRACE_MS = 900;
const EDGE_FADE_START = 0.55;
const EDGE_FADE_END = 1;
const EDGE_MIN_ALPHA = 0.12;

export default function DottedBackground({
  className,
  children,
  backgroundColor = DEFAULTS.backgroundColor,
  dotColor = DEFAULTS.dotColor,
  dotRadius = DEFAULTS.dotRadius,
  dotSpacing = DEFAULTS.dotSpacing,
  repelRadius = DEFAULTS.repelRadius,
  repelStrength = DEFAULTS.repelStrength,
  returnForce = DEFAULTS.returnForce,
  friction = DEFAULTS.friction,
}: DottedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<Dot[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const lastRenderRef = useRef<number>(0);
  const idleUntilRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const startAnimationRef = useRef<(() => void) | null>(null);
  const stopAnimationRef = useRef<(() => void) | null>(null);

  const pointerRef = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    active: false,
    inside: false,
    clientX: 0,
    clientY: 0,
  });

  const syncPointer = useCallback((clientX: number, clientY: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const wasInside = pointerRef.current.inside;
    const inside =
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom;

    pointerRef.current.clientX = clientX;
    pointerRef.current.clientY = clientY;
    pointerRef.current.inside = inside;
    pointerRef.current.active = inside;

    if (inside) {
      pointerRef.current.targetX = clientX - rect.left;
      pointerRef.current.targetY = clientY - rect.top;
    } else if (wasInside && !inside) {
      idleUntilRef.current = performance.now() + IDLE_GRACE_MS;
    }
  }, []);

  const containerStyle = useMemo(
    () => ({
      backgroundColor,
    }),
    [backgroundColor]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const size = { width: 0, height: 0, dpr: 1 };

    const buildDots = (width: number, height: number) => {
      const columns = Math.max(2, Math.ceil(width / dotSpacing));
      const rows = Math.max(2, Math.ceil(height / dotSpacing));
      const totalWidth = (columns - 1) * dotSpacing;
      const totalHeight = (rows - 1) * dotSpacing;
      const startX = (width - totalWidth) / 2;
      const startY = (height - totalHeight) / 2;

      const dots: Dot[] = [];
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < columns; col += 1) {
          const x = startX + col * dotSpacing;
          const y = startY + row * dotSpacing;
          dots.push({ x0: x, y0: y, x, y, vx: 0, vy: 0 });
        }
      }
      dotsRef.current = dots;
    };

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      size.width = rect.width;
      size.height = rect.height;
      size.dpr = dpr;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildDots(rect.width, rect.height);
      if (reduceMotion) {
        drawStatic();
      }
    };

    const getEdgeAlpha = (x: number, y: number) => {
      const cx = size.width * 0.5;
      const cy = size.height * 0.5;
      if (cx === 0 || cy === 0) return 1;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;
      const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy));
      const t = Math.min(
        1,
        Math.max(0, (dist - EDGE_FADE_START) / (EDGE_FADE_END - EDGE_FADE_START))
      );
      return Math.max(EDGE_MIN_ALPHA, 1 - t);
    };

    const drawDot = (x: number, y: number, radius: number) => {
      ctx.globalAlpha = getEdgeAlpha(x, y);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, size.width, size.height);
      ctx.fillStyle = dotColor;
      for (const dot of dotsRef.current) {
        drawDot(dot.x0, dot.y0, dotRadius);
      }
      ctx.globalAlpha = 1;
    };

    const stopAnimation = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    };

    const animate = (time: number) => {
      if (!isVisibleRef.current) {
        stopAnimation();
        return;
      }

      const pointer = pointerRef.current;
      if (!pointer.active && time > idleUntilRef.current) {
        stopAnimation();
        return;
      }

      const fps = pointer.active ? ACTIVE_FPS : IDLE_FPS;
      const frameInterval = 1000 / fps;
      if (time - lastRenderRef.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastRenderRef.current = time;

      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = Math.min(64, time - lastTimeRef.current) / 16.666;
      lastTimeRef.current = time;

      ctx.clearRect(0, 0, size.width, size.height);
      ctx.fillStyle = dotColor;

      const ease = pointer.active ? 0.3 : 0.16;
      pointer.x += (pointer.targetX - pointer.x) * ease;
      pointer.y += (pointer.targetY - pointer.y) * ease;

      const px = pointer.x;
      const py = pointer.y;
      const repelRadiusSq = repelRadius * repelRadius;

      for (const dot of dotsRef.current) {
        let ax = 0;
        let ay = 0;

        if (pointer.active) {
          const dx = dot.x - px;
          const dy = dot.y - py;
          const distSq = dx * dx + dy * dy;

          if (distSq < repelRadiusSq) {
            const dist = Math.max(0.001, Math.sqrt(distSq));
            const falloff = 1 - dist / repelRadius;
            const force = falloff * repelStrength;
            ax += (dx / dist) * force;
            ay += (dy / dist) * force;
          }
        }

        const homeX = dot.x0 - dot.x;
        const homeY = dot.y0 - dot.y;
        ax += homeX * returnForce;
        ay += homeY * returnForce;

        dot.vx = (dot.vx + ax) * friction;
        dot.vy = (dot.vy + ay) * friction;

        dot.x += dot.vx * delta;
        dot.y += dot.vy * delta;

        drawDot(dot.x, dot.y, dotRadius);
      }
      ctx.globalAlpha = 1;

      animationRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (reduceMotion) {
        drawStatic();
        return;
      }
      if (animationRef.current) return;
      lastTimeRef.current = 0;
      lastRenderRef.current = 0;
      animationRef.current = requestAnimationFrame(animate);
    };

    startAnimationRef.current = startAnimation;
    stopAnimationRef.current = stopAnimation;

    const onScroll = () => {
      const pointer = pointerRef.current;
      syncPointer(pointer.clientX, pointer.clientY);
      if (isVisibleRef.current && pointer.inside) {
        startAnimation();
      }
    };

    const onGlobalPointerMove = (event: PointerEvent) => {
      syncPointer(event.clientX, event.clientY);
      if (isVisibleRef.current && pointerRef.current.inside) {
        startAnimation();
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onGlobalPointerMove, { passive: true });

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.15 }
    );
    visibilityObserver.observe(wrapper);

    if (!reduceMotion) {
      startAnimation();
    }

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onGlobalPointerMove);
      visibilityObserver.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [
    dotColor,
    dotRadius,
    dotSpacing,
    repelRadius,
    repelStrength,
    returnForce,
    friction,
    syncPointer,
  ]);

  return (
    <div
      ref={wrapperRef}
      className={[styles.wrapper, className].filter(Boolean).join(" ")}
      style={containerStyle}
      onPointerEnter={(event) => {
        syncPointer(event.clientX, event.clientY);
        idleUntilRef.current = performance.now() + IDLE_GRACE_MS;
        startAnimationRef.current?.();
      }}
      onPointerMove={(event) => {
        syncPointer(event.clientX, event.clientY);
        startAnimationRef.current?.();
      }}
      onPointerLeave={() => {
        pointerRef.current.active = false;
        pointerRef.current.inside = false;
        idleUntilRef.current = performance.now() + IDLE_GRACE_MS;
        startAnimationRef.current?.();
      }}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

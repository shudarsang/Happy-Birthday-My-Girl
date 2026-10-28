"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useMotionValue, useScroll, type MotionValue } from "motion/react";
import { runnerConfig } from "@/lib/animation";
import { clamp } from "@/lib/utils";

/**
 * Scroll progress (0 → 1) for a running-cat track.
 *
 * Progress starts when the track scrolls into the bottom of the viewport — or
 * immediately on the first scroll if the track is already visible on load —
 * and completes after `travel` viewport-heights of scrolling. Everything is
 * driven through motion values, so scrolling never triggers React renders.
 */
export function useTrackProgress(
  ref: RefObject<HTMLElement | null>,
  { enterAt = runnerConfig.enterAt, travel = runnerConfig.travel } = {},
) {
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);
  const width = useMotionValue(0);
  const metrics = useRef({ start: 0, range: 1 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = (y: number) => {
      const { start, range } = metrics.current;
      progress.set(clamp((y - start) / range, 0, 1));
    };

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const top = rect.top + window.scrollY;
      const start = Math.max(0, top - vh * enterAt);
      // Near the bottom of the page there may be less scroll left than
      // `travel` — shorten the dash so the cat always makes it across.
      const maxScroll = document.documentElement.scrollHeight - vh;
      metrics.current = {
        start,
        range: Math.max(1, Math.min(vh * travel, maxScroll - start - 4)),
      };
      width.set(rect.width);
      update(window.scrollY);
    };

    measure();
    const unsubscribe = scrollY.on("change", update);
    // Layout can shift (fonts loading, "View More Photos"…) — re-measure.
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    ro.observe(el);
    window.addEventListener("resize", measure);

    return () => {
      unsubscribe();
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [ref, scrollY, progress, width, enterAt, travel]);

  return { progress, width };
}

/**
 * Toggles `data-moving` / `data-dir` on an element while a motion value is
 * changing. CSS uses these to run the leg cycle and to flip the cat when the
 * reader scrolls back up — no React re-renders involved.
 */
export function useMovingAttributes(
  value: MotionValue<number>,
  ref: RefObject<HTMLElement | null>,
  idleMs: number = runnerConfig.idleMs,
) {
  useEffect(() => {
    let last = value.get();
    let timer: number | undefined;

    const unsubscribe = value.on("change", (v) => {
      const el = ref.current;
      const delta = v - last;
      last = v;
      if (!el || delta === 0) return;
      el.dataset.moving = "true";
      el.dataset.dir = delta > 0 ? "forward" : "back";
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        el.dataset.moving = "false";
      }, idleMs);
    });

    return () => {
      unsubscribe();
      window.clearTimeout(timer);
    };
  }, [value, ref, idleMs]);
}

/** Keeps a motion value in sync with an element's height. */
export function useElementHeight(ref: RefObject<HTMLElement | null>) {
  const height = useMotionValue(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => height.set(el.offsetHeight));
    ro.observe(el);
    height.set(el.offsetHeight);
    return () => ro.disconnect();
  }, [ref, height]);
  return height;
}

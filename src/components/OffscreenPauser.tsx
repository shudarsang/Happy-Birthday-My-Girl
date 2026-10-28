"use client";

import { useEffect } from "react";

/**
 * Pauses decorative CSS loops in sections far outside the viewport by
 * toggling `data-offscreen` (see globals.css). One observer for the page.
 */
export function OffscreenPauser() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-pause-offscreen]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).dataset.offscreen = entry.isIntersecting ? "false" : "true";
        }
      },
      { rootMargin: "200px 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return null;
}

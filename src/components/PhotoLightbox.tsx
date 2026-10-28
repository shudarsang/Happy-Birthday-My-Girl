"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { CatFigure } from "@/components/cats/CatFigure";
import type { Photo } from "@/data/photos";
import { ease } from "@/lib/animation";

interface PhotoLightboxProps {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

const slide: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 70 : -70, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.3, ease: ease.soft } },
  exit: (dir: number) => ({ x: dir >= 0 ? -70 : 70, opacity: 0, scale: 0.97, transition: { duration: 0.2 } }),
};

/**
 * Accessible photo viewer: Esc closes, ← / → navigate, Tab stays inside,
 * swipe on touch screens, page scroll is locked while open and focus returns
 * to the photo that opened it.
 */
export function PhotoLightbox({ photos, index, onClose, onChange }: PhotoLightboxProps) {
  const open = index !== null;
  const [mounted, setMounted] = useState(false);
  const [dir, setDir] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDir(delta);
      onChange((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onChange],
  );

  // Scroll lock + focus management.
  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { body } = document;
    const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    closeRef.current?.focus();

    return () => {
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [open]);

  // Keyboard controls.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  if (!mounted) return null;

  const photo = index !== null ? photos[index] : null;

  return createPortal(
    <AnimatePresence>
      {open && photo && (
        <motion.div
          key="lightbox"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-plum/55 p-3 backdrop-blur-md sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute right-3 top-3 z-10 grid size-12 place-items-center rounded-full bg-white text-plum shadow-soft transition hover:scale-105 hover:text-berry sm:right-6 sm:top-6"
          >
            <X className="size-6" aria-hidden="true" />
          </button>

          <div className="relative flex w-full max-w-5xl items-center justify-center">
            <AnimatePresence initial={false} custom={dir} mode="wait">
              <motion.figure
                key={index}
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                drag={photos.length > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70 || info.velocity.x < -500) go(1);
                  else if (info.offset.x > 70 || info.velocity.x > 500) go(-1);
                }}
                className="relative w-full max-w-4xl touch-pan-y rounded-[22px] bg-white p-2.5 pb-3 shadow-2xl sm:p-3"
              >
                <div aria-hidden="true" className="pointer-events-none absolute -top-[37px] right-8 w-[54px]">
                  <CatFigure pose="peek" variant="white" accessory="bow" />
                </div>
                <div className="relative h-[min(64svh,760px)] w-full overflow-hidden rounded-2xl bg-shell">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 880px, 94vw"
                    draggable={false}
                    className="pointer-events-none select-none object-contain"
                  />
                </div>
                <figcaption className="flex items-center justify-between gap-3 px-2 pt-2.5">
                  <span className="font-letter text-xl text-plum sm:text-2xl">{photo.caption ?? ""}</span>
                  <span className="shrink-0 font-hand text-sm font-semibold text-plum-soft">
                    {index + 1} / {photos.length}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous photo"
                  className="absolute left-1 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-plum shadow-soft transition hover:scale-105 hover:text-berry lg:-left-1"
                >
                  <ChevronLeft className="size-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next photo"
                  className="absolute right-1 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-plum shadow-soft transition hover:scale-105 hover:text-berry lg:-right-1"
                >
                  <ChevronRight className="size-6" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

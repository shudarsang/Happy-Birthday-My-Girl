"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { HeartIcon } from "@/components/decorations/Doodles";
import { Burst } from "@/components/ui/Burst";
import { RichText } from "@/components/ui/RichText";
import { siteConfig } from "@/data/siteConfig";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { spring } from "@/lib/animation";
import { cn, positioned } from "@/lib/utils";
import { CatFigure, type CatFigureProps } from "./CatFigure";

export interface CatProps extends Omit<CatFigureProps, "className" | "style" | "heartVisible"> {
  className?: string;
  style?: CSSProperties;
  figureClassName?: string;
  /** What the cat may say when tapped. */
  phrases?: readonly string[];
  burst?: "hearts" | "paws";
  /** Per-cat timing so no two cats blink or sway in sync. */
  blink?: number;
  blinkDelay?: number;
  tail?: number;
  onPet?: () => void;
}

/**
 * An interactive, decorative cat: hover (or tap) to make it blink and wiggle
 * its ears, click/tap to make it hop, say something and puff out hearts.
 * Heart-carrying cats let their heart float away and get a new one.
 */
export function Cat({
  className,
  style,
  figureClassName,
  phrases = siteConfig.catPhrases,
  burst = "hearts",
  blink = 4.6,
  blinkDelay = 0,
  tail = 2.8,
  onPet,
  ...figure
}: CatProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const [bubble, setBubble] = useState<{ id: number; text: string } | null>(null);
  const [bursts, setBursts] = useState<number[]>([]);
  const [heartAway, setHeartAway] = useState(false);
  const timers = useRef<Set<number>>(new Set());
  const bubbleTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(bubbleTimer.current);
    };
  }, []);

  const later = (fn: () => void, ms: number) => {
    const t = window.setTimeout(() => {
      timers.current.delete(t);
      fn();
    }, ms);
    timers.current.add(t);
  };

  const pet = () => {
    onPet?.();
    if (!reduced && scope.current) {
      animate(
        scope.current,
        { y: [0, -18, 0, -5, 0], scaleY: [1, 1.06, 0.92, 1.02, 1] },
        { duration: 0.65, ease: "easeOut" },
      );
    }

    const id = Date.now();
    setBursts((b) => [...b.slice(-2), id]);
    later(() => setBursts((b) => b.filter((x) => x !== id)), 1000);

    if (phrases.length > 0) {
      setBubble({ id, text: phrases[Math.floor(Math.random() * phrases.length)] });
      window.clearTimeout(bubbleTimer.current);
      bubbleTimer.current = window.setTimeout(() => setBubble(null), 1700);
    }

    if (figure.accessory === "heart" || (!figure.accessory && figure.variant === "cream")) {
      if (!heartAway) {
        setHeartAway(true);
        later(() => setHeartAway(false), 1800);
      }
    }
  };

  const vars = {
    "--blink": `${blink}s`,
    "--blink-delay": `${blinkDelay}s`,
    "--tail": `${tail}s`,
    ...style,
  } as CSSProperties;

  return (
    <div aria-hidden="true" className={cn("cat-pet cursor-pointer select-none", positioned(className))} style={vars} onClick={pet}>
      <div ref={scope} className="origin-bottom">
        <CatFigure {...figure} heartVisible={!heartAway} className={figureClassName} />
      </div>

      <AnimatePresence>
        {bubble && (
          <motion.div
            key={bubble.id}
            initial={{ opacity: 0, y: 8, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={spring.bouncy}
            className="pointer-events-none absolute bottom-[94%] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 font-hand text-sm font-semibold text-berry shadow-soft ring-1 ring-petal/70"
          >
            <RichText text={bubble.text} />
            <span className="absolute left-1/2 top-full -ml-1.5 -mt-1.5 size-3 rotate-45 bg-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {bursts.map((id) => (
        <Burst key={id} seed={id % 97} kind={burst} />
      ))}

      <AnimatePresence>
        {heartAway && (
          <motion.span
            key="floating-heart"
            className="pointer-events-none absolute left-1/2 top-[70%] z-20 -ml-3 block size-6"
            initial={{ opacity: 1, y: 0, x: 0, scale: 0.8 }}
            animate={{ opacity: [1, 1, 0], y: -90, x: [0, 10, -8, 6], scale: 1.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.7, ease: "easeOut" }}
          >
            <HeartIcon className="size-full" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

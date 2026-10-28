"use client";

import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { AnimatePresence, motion, useAnimate, useInView, useScroll, useTransform } from "motion/react";
import { HeartIcon } from "@/components/decorations/Doodles";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useElementHeight, useMovingAttributes } from "@/hooks/useScrollAnimations";
import { spring } from "@/lib/animation";
import { cn, positioned } from "@/lib/utils";
import { Cat } from "./Cat";
import { CatFigure } from "./CatFigure";
import type { CatAccessory, CatVariant } from "./catPalettes";

interface DecoProps {
  variant?: CatVariant;
  accessory?: CatAccessory;
  className?: string;
}

/* ───────────── Peeking: rises from behind an edge, looks around, ducks back ───────────── */

export function PeekingCat({
  variant = "gray",
  accessory,
  className,
  delay = 0,
  duration = 9,
}: DecoProps & { delay?: number; duration?: number }) {
  return (
    // The caller positions this clip box so its bottom edge is the "edge" being peeked over.
    <div aria-hidden="true" className={cn("pointer-events-none absolute aspect-[120/86] overflow-hidden", className)}>
      <div
        className="peek-loop pointer-events-auto"
        style={{ "--peek-delay": `${delay}s`, "--peek-dur": `${duration}s` } as CSSProperties}
      >
        <Cat pose="peek" variant={variant} accessory={accessory} blink={3.4} blinkDelay={delay} />
      </div>
    </div>
  );
}

/* ───────────── Kitten chasing a floating heart round a little loop ───────────── */

export function HeartChase({ variant = "orange", accessory, className }: DecoProps) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return (
      <div aria-hidden="true" className={cn("pointer-events-none absolute flex h-[70px] w-[170px] items-end justify-center gap-2", className)}>
        <div className="w-12">
          <CatFigure pose="sit" variant={variant} accessory="none" />
        </div>
        <HeartIcon className="mb-10 size-4" />
      </div>
    );
  }
  return (
    <div aria-hidden="true" data-moving="true" className={cn("pointer-events-none absolute h-[70px] w-[170px]", className)}>
      <span className="chase-path" style={{ animationDelay: "-1s" }}>
        <span className="heart-bob block size-4">
          <HeartIcon className="size-full" />
        </span>
      </span>
      <span className="chase-path">
        <span className="chase-flip block w-12">
          <CatFigure pose="run" variant={variant} accessory={accessory ?? "none"} />
        </span>
      </span>
    </div>
  );
}

/* ───────────── Sleepy cat: Zzz… and stretches when it scrolls into view ───────────── */

function Zzz({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("zzz pointer-events-none absolute font-hand font-bold text-plum-soft", className)}>
      <span>z</span>
      <span>z</span>
      <span>Z</span>
    </div>
  );
}

export function SleepyCat({
  variant = "cream",
  accessory,
  className,
  stretchOnView = false,
}: DecoProps & { stretchOnView?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.9 });
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [awake, setAwake] = useState(false);

  useEffect(() => {
    if (!stretchOnView || !inView || reduced || !scope.current) return;
    let t: number | undefined;
    const start = window.setTimeout(() => {
      setAwake(true);
      animate(
        scope.current,
        { scaleX: [1, 1.18, 1.18, 1], scaleY: [1, 0.85, 0.85, 1], rotate: [0, -4, -4, 0] },
        { duration: 2, times: [0, 0.3, 0.75, 1], ease: "easeInOut" },
      );
      t = window.setTimeout(() => setAwake(false), 2600);
    }, 500);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(t);
    };
  }, [stretchOnView, inView, reduced, animate, scope]);

  return (
    <div ref={ref} aria-hidden="true" className={positioned(className)}>
      <div ref={scope} className="origin-bottom">
        <Cat
          pose="sleep"
          variant={variant}
          accessory={accessory}
          eyes={awake ? "open" : "closed"}
          phrases={["Zzz... ♡", "*yawn*", "Five more minutes~", "Mrrp..."]}
        />
      </div>
      {!awake && <Zzz className="left-[24%] top-[4%] text-sm" />}
      <AnimatePresence>
        {awake && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4 }}
            transition={spring.bouncy}
            className="absolute -top-7 left-[18%] whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 font-hand text-xs font-semibold text-berry shadow-soft"
          >
            *stretch*~
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────── A cat strolling along a bottom edge, following a heart ───────────── */

export function StrollingCat({ variant = "cream", accessory, className, duration = 26 }: DecoProps & { duration?: number }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return (
      <div aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 h-16", className)}>
        <div className="absolute bottom-0 left-[6%] w-12">
          <CatFigure pose="sit" variant={variant} accessory={accessory} />
        </div>
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      data-moving="true"
      data-gait="walk"
      className={cn("pointer-events-none absolute inset-x-0 h-16 overflow-x-clip", className)}
    >
      <div className="stroll absolute inset-0" style={{ "--stroll-dur": `${duration}s` } as CSSProperties}>
        <div className="absolute bottom-0 right-full flex items-end gap-1">
          <div className="w-14 sm:w-16">
            <CatFigure pose="run" variant={variant} accessory={accessory} />
          </div>
          <span className="heart-bob mb-9 block size-4">
            <HeartIcon className="size-full" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Slides out from behind a photo frame (rendered behind it) ───────────── */

export function SlideOutCat({ variant = "tuxedo", accessory, className }: DecoProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("absolute z-[-1] w-16", className)}
      initial={{ x: "-40%" }}
      whileInView={{ x: "88%" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ ...spring.gentle, delay: 0.7 }}
    >
      <div className="rotate-90">
        <Cat pose="peek" variant={variant} accessory={accessory} blink={5.2} phrases={[]} />
      </div>
    </motion.div>
  );
}

/* ───────────── Jumps onto a card and sits down ───────────── */

export function JumpingCat({ variant = "sakura", accessory, className }: DecoProps) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn("absolute w-14 sm:w-16", className)}
      initial={{ opacity: 0, x: -80, y: 50, rotate: -18 }}
      whileInView={{
        opacity: [0, 1, 1, 1],
        x: [-80, -38, 0, 0],
        y: [50, -48, 0, 0],
        rotate: [-18, -6, 0, 0],
        scaleY: [1, 1.04, 0.84, 1],
      }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 0.95, times: [0, 0.5, 0.8, 1], ease: "easeOut", delay: 0.3 }}
      style={{ transformOrigin: "50% 100%" }}
    >
      <Cat pose="sit" variant={variant} accessory={accessory} blink={3.9} tail={2.2} />
    </motion.div>
  );
}

/* ───────────── Climbs up the side of a card, then sits on top ───────────── */

export function ClimbingCat({ variant = "orange", accessory, className }: DecoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [phase, setPhase] = useState<"waiting" | "climbing" | "sitting">("waiting");

  useEffect(() => {
    if (inView) setPhase(reduced ? "sitting" : "climbing");
  }, [inView, reduced]);

  return (
    // Caller stretches this along the side of the card (e.g. inset-y-0).
    <div ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute w-14", className)}>
      {phase === "climbing" && (
        <motion.div
          data-moving="true"
          data-gait="walk"
          className="absolute inset-0"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 3.4, ease: "linear" }}
          onAnimationComplete={() => setPhase("sitting")}
        >
          <div className="w-14 -rotate-90">
            <CatFigure pose="run" variant={variant} accessory={accessory} />
          </div>
        </motion.div>
      )}
      {phase === "sitting" && (
        <motion.div
          className="pointer-events-auto absolute -top-[62px] left-0 w-14"
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={spring.bouncy}
        >
          <Cat pose="sit" variant={variant} accessory={accessory} tail={1.9} blink={4.1} />
        </motion.div>
      )}
    </div>
  );
}

/* ───────────── Kitten walking down a timeline line as you read ───────────── */

export function TimelineKitten({
  containerRef,
  variant = "gray",
  accessory,
  className,
}: DecoProps & { containerRef: RefObject<HTMLElement | null> }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 0.6", "end 0.6"] });
  const height = useElementHeight(containerRef);
  const y = useTransform([scrollYProgress, height], ([p, h]: number[]) => p * Math.max(0, h - 56));
  useMovingAttributes(scrollYProgress, ref);

  if (reduced) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      data-moving="false"
      data-dir="forward"
      data-gait="walk"
      style={{ y }}
      className={cn("pointer-events-none absolute top-0 z-10 w-12 -translate-x-1/2", className)}
    >
      <div className="rotate-90">
        <div className="runner-flip">
          <CatFigure pose="run" variant={variant} accessory={accessory} />
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────── Peeks in from the left edge of the screen (re-plays with a cooldown) ───────────── */

export function EdgePeekCat({ variant = "white", accessory, className }: DecoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { amount: 0.8 });
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const lastPlayed = useRef(0);

  useEffect(() => {
    if (!scope.current) return;
    if (reduced) {
      scope.current.style.transform = "translateX(-22%)";
      return;
    }
    if (!inView || Date.now() - lastPlayed.current < 12000) return;
    lastPlayed.current = Date.now();
    const controls = animate(
      scope.current,
      { x: ["-105%", "-22%", "-22%", "-105%"] },
      { duration: 5.5, times: [0, 0.14, 0.82, 1], ease: "easeInOut", delay: 0.3 },
    );
    return () => controls.stop();
  }, [inView, reduced, animate, scope]);

  return (
    <div ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute left-0 h-[84px] w-[60px] overflow-hidden", className)}>
      <div ref={scope} className="pointer-events-auto absolute inset-0" style={{ transform: "translateX(-105%)" }}>
        <div className="absolute left-1/2 top-1/2 w-[84px] -translate-x-1/2 -translate-y-1/2 rotate-90">
          <Cat pose="peek" variant={variant} accessory={accessory} phrases={[]} burst="paws" />
        </div>
      </div>
    </div>
  );
}

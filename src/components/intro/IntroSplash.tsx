"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { CatFigure } from "@/components/cats/CatFigure";
import type { CatAccessory, CatVariant } from "@/components/cats/catPalettes";
import { HeartIcon, HeartOutline, PawPrint, Sparkle } from "@/components/decorations/Doodles";
import { RichText } from "@/components/ui/RichText";
import { siteConfig } from "@/data/siteConfig";
import { ease, spring } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { Cake } from "./Cake";

type Mode = "pending" | "full" | "calm";

/** Timeline (seconds) — everything below is keyed off these. */
const T = {
  line1: 0.35,
  letter1: 0.055,
  line2: 1.3,
  letter2: 0.075,
  flourish: 2.05,
  confetti: 2.15,
  cake: 0.85,
  cats: 0.95,
  ready: 3.4,
  /** Taps before this are ignored so the greeting isn't skipped by accident. */
  tapToSkip: 2.4,
};

/* ───────────── Hearts drifting up the whole screen ───────────── */

const RISING = [
  { left: 4, size: 26, dur: 9, delay: -2, kind: "heart", color: "#FF7FAF" },
  { left: 11, size: 16, dur: 7.5, delay: -5, kind: "outline", color: "#E94F87" },
  { left: 18, size: 34, dur: 11, delay: -1, kind: "heart", color: "#FFC2DA" },
  { left: 26, size: 14, dur: 8, delay: -6.5, kind: "sparkle", color: "#FFFFFF" },
  { left: 33, size: 22, dur: 10, delay: -3.5, kind: "heart", color: "#FF9EC4" },
  { left: 41, size: 18, dur: 8.5, delay: -7.5, kind: "outline", color: "#FF7FAF" },
  { left: 49, size: 12, dur: 9.5, delay: -0.5, kind: "sparkle", color: "#FFFFFF" },
  { left: 56, size: 28, dur: 10.5, delay: -4.5, kind: "heart", color: "#FF7FAF" },
  { left: 63, size: 16, dur: 7, delay: -2.5, kind: "heart", color: "#E9DDFB" },
  { left: 70, size: 24, dur: 9, delay: -8, kind: "outline", color: "#E94F87" },
  { left: 77, size: 30, dur: 11.5, delay: -6, kind: "heart", color: "#FFC2DA" },
  { left: 84, size: 14, dur: 8, delay: -1.5, kind: "sparkle", color: "#FFFFFF" },
  { left: 90, size: 20, dur: 9.5, delay: -5.5, kind: "heart", color: "#FF9EC4" },
  { left: 96, size: 18, dur: 8.5, delay: -3, kind: "outline", color: "#FF7FAF" },
] as const;

function RisingHearts() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {RISING.map((h, i) => (
        <span
          key={i}
          className="rise-up absolute -bottom-12 block"
          style={
            {
              left: `${h.left}%`,
              width: h.size,
              height: h.size,
              color: h.color,
              "--dur": `${h.dur}s`,
              "--delay": `${h.delay}s`,
              "--sway": `${i % 2 ? 18 : -18}px`,
            } as CSSProperties
          }
        >
          {h.kind === "heart" && <HeartIcon className="size-full" color={h.color} />}
          {h.kind === "outline" && <HeartOutline className="size-full" />}
          {h.kind === "sparkle" && <Sparkle className="size-full" />}
        </span>
      ))}
    </div>
  );
}

/* ───────────── Confetti burst ───────────── */

interface Particle {
  x: number;
  y: number;
  fall: number;
  rot: number;
  size: number;
  color: string;
  kind: "heart" | "dot" | "sparkle" | "paw";
}

const CONFETTI_COLORS = ["#FF6FA3", "#E94F87", "#FFB6D5", "#C8A8F5", "#FFD66B", "#FFFFFF"];
const KINDS: Particle["kind"][] = ["heart", "dot", "sparkle", "heart", "dot", "paw"];

function makeConfetti(w: number, h: number): Particle[] {
  const n = 42;
  const reach = Math.min(w, h);
  return Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * Math.PI * 2 + (i % 3) * 0.17;
    const dist = reach * (0.28 + ((i * 37) % 11) / 30);
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist * 0.8 - h * 0.06,
      fall: h * (0.25 + ((i * 13) % 7) / 25),
      rot: (i % 2 ? 1 : -1) * (180 + ((i * 47) % 360)),
      size: 10 + ((i * 7) % 5) * 4,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      kind: KINDS[i % KINDS.length],
    };
  });
}

function Confetti({ particles }: { particles: Particle[] }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[42%] z-20">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute block"
          style={{ width: p.size, height: p.size, marginLeft: -p.size / 2, marginTop: -p.size / 2, color: p.color }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.4 }}
          animate={{ x: p.x, y: [0, p.y, p.y + p.fall], opacity: [1, 1, 0], rotate: p.rot, scale: 1 }}
          transition={{
            duration: 2.6,
            ease: "easeOut",
            y: { duration: 2.6, times: [0, 0.38, 1], ease: ["easeOut", "easeIn"] },
            opacity: { duration: 2.6, times: [0, 0.72, 1] },
          }}
        >
          {p.kind === "heart" && <HeartIcon className="size-full" color={p.color} />}
          {p.kind === "dot" && <span className="block size-full rounded-full" style={{ background: p.color }} />}
          {p.kind === "sparkle" && <Sparkle className="size-full" />}
          {p.kind === "paw" && <PawPrint className="size-full" />}
        </motion.span>
      ))}
    </div>
  );
}

/* ───────────── Letter-by-letter lines ───────────── */

function AnimatedLine({
  text,
  start,
  step,
  variant: kind,
  mode,
  className,
}: {
  text: string;
  start: number;
  step: number;
  variant: "drop" | "pop";
  /** "pending" holds the letters until the motion preference is known; "calm" just fades in. */
  mode: Mode;
  className?: string;
}) {
  const reduced = mode === "calm";
  let index = 0;
  const words = text.split(" ");
  return (
    <span className={cn("block", className)}>
      {words.map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {[...word].map((ch) => {
            const i = index++;
            const delay = start + i * step;
            return (
              <motion.span
                key={i}
                className="inline-block"
                initial={
                  kind === "drop"
                    ? { opacity: 0, y: -110, rotate: -22, scale: 0.5 }
                    : { opacity: 0, scale: 0, rotate: 28, y: 24 }
                }
                animate={
                  mode === "pending"
                    ? undefined
                    : reduced
                      ? { opacity: 1, y: 0, rotate: 0, scale: 1 }
                      : kind === "drop"
                      ? { opacity: 1, y: 0, rotate: 0, scale: 1 }
                      : { opacity: 1, scale: [0, 1.35, 1], rotate: [28, -10, 0], y: 0 }
                }
                transition={
                  reduced
                    ? { duration: 0.6 }
                    : kind === "drop"
                      ? { type: "spring", stiffness: 380, damping: 16, delay }
                      : { duration: 0.6, ease: "easeOut", delay }
                }
              >
                <span
                  className={cn("inline-block", kind === "pop" && "letter-wave")}
                  style={kind === "pop" ? { animationDelay: `${T.flourish + 0.6 + i * 0.12}s` } : undefined}
                >
                  {ch}
                </span>
              </motion.span>
            );
          })}
          {w < words.length - 1 && <span className="inline-block w-[0.28em]" />}
        </span>
      ))}
    </span>
  );
}

/* ───────────── Kittens that run in and sit by the cake ───────────── */

function IntroCat({
  side,
  variant,
  accessory,
  delay,
}: {
  side: "left" | "right";
  variant: CatVariant;
  accessory?: CatAccessory;
  delay: number;
}) {
  const [sitting, setSitting] = useState(false);
  return (
    <motion.div
      data-moving={sitting ? "false" : "true"}
      className={cn("absolute bottom-0", side === "left" ? "left-0" : "right-0")}
      style={{ width: "clamp(64px, min(13vh, 22vw), 110px)" }}
      initial={{ x: side === "left" ? "-62vw" : "62vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 1.7, ease: [0.25, 0.8, 0.4, 1], delay }}
      onAnimationComplete={() => setSitting(true)}
    >
      {sitting ? (
        <motion.div initial={{ scale: 0.7, y: 10 }} animate={{ scale: 1, y: 0 }} transition={spring.bouncy} className="relative origin-bottom">
          <span className="heart-bob absolute -top-5 left-1/2 -ml-2.5 block size-5">
            <HeartIcon className="size-full" />
          </span>
          <CatFigure pose="sit" variant={variant} accessory={accessory} />
        </motion.div>
      ) : (
        <div className={side === "right" ? "-scale-x-100" : undefined}>
          <CatFigure pose="run" variant={variant} accessory={accessory} />
        </div>
      )}
    </motion.div>
  );
}

/* ───────────── The scene ───────────── */

export function IntroSplash({ onDone }: { onDone: () => void }) {
  const { intro } = siteConfig;
  // Read the motion preference once on mount, before anything starts moving.
  const [mode, setMode] = useState<Mode>("pending");
  const reduced = mode === "calm";
  const [ready, setReady] = useState(false);
  const [confetti, setConfetti] = useState<Particle[] | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const openedAt = useRef(0);

  const finish = useCallback(() => onDone(), [onDone]);

  // Lock the page behind the greeting and start at the top.
  useEffect(() => {
    setMode(window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "calm" : "full");
    openedAt.current = performance.now();
    const { body } = document;
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      body.style.overflow = prev;
    };
  }, []);

  // Timeline.
  useEffect(() => {
    if (mode === "pending") return;
    const timers: number[] = [];
    if (!reduced) {
      timers.push(window.setTimeout(() => setConfetti(makeConfetti(window.innerWidth, window.innerHeight)), T.confetti * 1000));
      timers.push(window.setTimeout(() => setConfetti(null), (T.confetti + 2.8) * 1000));
    }
    timers.push(window.setTimeout(() => setReady(true), (reduced ? 0.8 : T.ready) * 1000));
    if (intro.autoContinueAfter > 0) timers.push(window.setTimeout(finish, intro.autoContinueAfter * 1000));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [mode, reduced, finish, intro.autoContinueAfter]);

  // Keyboard: Enter / Space / Escape continue once the greeting has played.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!["Enter", " ", "Escape"].includes(e.key)) return;
      if (performance.now() - openedAt.current < T.tapToSkip * 1000) return;
      e.preventDefault();
      finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish]);

  useEffect(() => {
    if (ready) buttonRef.current?.focus({ preventScroll: true });
  }, [ready]);

  const onTap = () => {
    if (reduced || performance.now() - openedAt.current >= T.tapToSkip * 1000) finish();
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-title"
      className="bg-intro fixed inset-0 z-[100] flex cursor-pointer select-none flex-col items-center justify-center overflow-hidden px-4 text-center"
      exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.9, ease: ease.inOut } }}
      onClick={onTap}
    >
      <div aria-hidden="true" className="glow-pulse pointer-events-none absolute left-1/2 top-[42%] size-[min(90vw,90vh)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.85),rgb(255_255_255/0)_65%)]" />
      <RisingHearts />
      {confetti && <Confetti particles={confetti} />}

      <h2 id="intro-title" className="sr-only">
        {intro.line1} {intro.line2}
      </h2>

      <div aria-hidden="true" className="relative z-10 font-script leading-[0.95]">
        <AnimatedLine
          text={intro.line1}
          start={T.line1}
          step={T.letter1}
          variant="drop"
          mode={mode}
          className="text-[clamp(3.1rem,min(17vw,17vh),9.5rem)] text-plum [text-shadow:0_4px_0_#fff]"
        />
        <span className="relative mt-1 inline-block">
          <AnimatedLine
            text={intro.line2}
            start={T.line2}
            step={T.letter2}
            variant="pop"
            mode={mode}
            className="text-[clamp(3.7rem,min(21vw,21vh),12rem)] text-berry [text-shadow:0_4px_0_#fff,0_14px_34px_rgb(233_79_135/0.35)]"
          />
          <motion.svg
            viewBox="0 0 200 22"
            preserveAspectRatio="none"
            className="absolute -bottom-[0.06em] left-[6%] h-[0.12em] w-[88%] text-[clamp(3.7rem,min(21vw,21vh),12rem)] text-berry"
          >
            <motion.path
              d="M4 15 C40 5 84 4 122 10 S178 17 196 7"
              stroke="currentColor"
              strokeWidth={6}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={mode === "pending" ? undefined : { pathLength: 1, opacity: 1 }}
              transition={reduced ? { duration: 0 } : { duration: 0.7, ease: "easeInOut", delay: T.flourish }}
            />
          </motion.svg>
          <motion.span
            className="absolute -right-[0.4em] top-[0.05em] block size-[0.45em] text-[clamp(3.7rem,min(21vw,21vh),12rem)]"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ ...spring.bouncy, delay: T.flourish + 0.2 }}
          >
            <span className="heartbeat block size-full">
              <HeartIcon className="size-full" />
            </span>
          </motion.span>
        </span>
      </div>

      {/* Cake with two kittens running in to sit beside it */}
      <div aria-hidden="true" className="relative z-10 mt-[4vh] flex w-full max-w-lg items-end justify-center">
        <IntroCat side="left" variant="white" accessory="bow" delay={T.cats} />
        <motion.div
          style={{ width: "clamp(120px, min(24vh, 40vw), 210px)" }}
          initial={{ y: 90, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ ...spring.bouncy, delay: T.cake }}
        >
          <Cake />
        </motion.div>
        <IntroCat side="right" variant="sakura" delay={T.cats + 0.15} />
      </div>

      <motion.div
        className="relative z-10 mt-[3vh] flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.6, ease: ease.soft }}
      >
        <button
          ref={buttonRef}
          type="button"
          tabIndex={ready ? 0 : -1}
          onClick={(e) => {
            e.stopPropagation();
            finish();
          }}
          className="soft-pulse inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#C93370] to-[#D9477F] px-7 py-3 font-hand text-base font-bold text-white shadow-card transition hover:scale-105 sm:text-lg"
        >
          <RichText text={intro.button} />
        </button>
        <p className="font-hand text-sm text-plum-soft">{intro.hint}</p>
      </motion.div>
    </motion.div>
  );
}

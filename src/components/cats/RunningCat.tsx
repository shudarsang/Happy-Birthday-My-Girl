"use client";

import { useRef } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import { HeartIcon, PawPrint } from "@/components/decorations/Doodles";
import { RichText } from "@/components/ui/RichText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMovingAttributes, useTrackProgress } from "@/hooks/useScrollAnimations";
import { clamp, cn } from "@/lib/utils";
import { CatFigure } from "./CatFigure";
import type { CatAccessory, CatVariant } from "./catPalettes";

export interface RunnerSpec {
  variant: CatVariant;
  accessory?: CatAccessory;
  /** Slice of the track's scroll progress during which this cat crosses. */
  window?: [number, number];
  /** Size multiplier (kittens chasing each other can differ a little). */
  scale?: number;
  /** Vertical offset in px (negative = higher). */
  lane?: number;
}

export interface RunningCatTrackProps {
  runners: RunnerSpec[];
  /** The lead cat waits, visible, at the left edge until scrolling starts. */
  startVisible?: boolean;
  pawPrints?: boolean;
  hearts?: boolean;
  /** A little heart floats just ahead of the lead cat. */
  chaseHeart?: boolean;
  hint?: string;
  className?: string;
}

const PAW_SPOTS = [0.08, 0.16, 0.24, 0.32, 0.4, 0.48, 0.56, 0.64, 0.72, 0.8, 0.88];
const HEART_SPOTS = [0.24, 0.5, 0.76];

/** Cat width (px) for a given track width — smaller cats on phones. */
const catWidth = (trackWidth: number) => clamp(trackWidth * 0.075, 64, 112);

/** Left offset (px) of a runner at scroll progress `p`. */
function runnerX(p: number, w: number, cw: number, win: [number, number], startVisible: boolean) {
  const t = clamp((p - win[0]) / (win[1] - win[0]), 0, 1);
  const from = startVisible ? w * 0.03 : -cw * 1.15;
  const to = w + cw * 0.3;
  return from + (to - from) * t;
}

interface Shared {
  progress: MotionValue<number>;
  width: MotionValue<number>;
  win: [number, number];
  scale: number;
  startVisible: boolean;
}

/**
 * A strip, usually placed on a section boundary, where cats dash across the
 * screen in sync with scrolling. Scrolling back up makes them turn around.
 */
export function RunningCatTrack({
  runners,
  startVisible = false,
  pawPrints = true,
  hearts = false,
  chaseHeart = false,
  hint,
  className,
}: RunningCatTrackProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { progress, width } = useTrackProgress(ref);
  useMovingAttributes(progress, ref);

  const lead = runners[0];
  const leadShared: Shared = {
    progress,
    width,
    win: lead.window ?? [0, 1],
    scale: lead.scale ?? 1,
    startVisible,
  };

  if (reduced) {
    // Calm version: the lead cat simply sits at the edge of the section.
    return (
      <div ref={ref} aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 z-20 h-20 sm:h-28", className)}>
        <div className="absolute bottom-0 left-[6%] w-14 sm:w-16">
          <CatFigure pose="sit" variant={lead.variant} accessory={lead.accessory} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-moving="false"
      data-dir="forward"
      className={cn("pointer-events-none absolute inset-x-0 z-20 h-20 overflow-x-clip sm:h-28", className)}
    >
      {pawPrints && PAW_SPOTS.map((spot, i) => <TrackPaw key={spot} spot={spot} index={i} {...leadShared} />)}
      {hearts && HEART_SPOTS.map((spot) => <TrackHeart key={spot} spot={spot} {...leadShared} />)}
      {chaseHeart && <ChaseHeart {...leadShared} />}
      {runners.map((spec, i) => (
        <Runner
          key={i}
          spec={spec}
          hint={i === 0 ? hint : undefined}
          progress={progress}
          width={width}
          win={spec.window ?? [0, 1]}
          scale={spec.scale ?? 1}
          startVisible={i === 0 && startVisible}
        />
      ))}
    </div>
  );
}

function Runner({ spec, hint, progress, width, win, scale, startVisible }: Shared & { spec: RunnerSpec; hint?: string }) {
  const cw = useTransform(width, (w) => catWidth(w) * scale);
  const x = useTransform([progress, width], ([p, w]: number[]) => runnerX(p, w, catWidth(w) * scale, win, startVisible));
  const hintOpacity = useTransform(progress, [0, 0.03], [1, 0]);

  return (
    <motion.div className="absolute bottom-0 left-0" style={{ x, y: spec.lane ?? 0, width: cw }}>
      {hint && (
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-[88%] left-[40%] whitespace-nowrap rounded-full rounded-bl-sm bg-white/95 px-3 py-1 font-hand text-xs font-semibold text-berry shadow-soft ring-1 ring-petal/60 sm:text-sm"
        >
          <RichText text={hint} />
        </motion.div>
      )}
      <div className="runner-flip">
        <CatFigure pose="run" variant={spec.variant} accessory={spec.accessory} />
      </div>
    </motion.div>
  );
}

function TrackPaw({ spot, index, progress, width, win, scale, startVisible }: Shared & { spot: number; index: number }) {
  const opacity = useTransform([progress, width], ([p, w]: number[]) => {
    const cw = catWidth(w) * scale;
    const hindPaws = runnerX(p, w, cw, win, startVisible) + cw * 0.3;
    const d = hindPaws - spot * w;
    const fade = w * 0.22;
    return d <= 0 || d > fade ? 0 : 0.55 * (1 - d / fade);
  });
  return (
    <motion.span
      style={{ opacity, left: `${spot * 100}%` }}
      className={cn("absolute block size-3 rotate-90 text-berry", index % 2 ? "bottom-0" : "bottom-2.5")}
    >
      <PawPrint className="size-full" />
    </motion.span>
  );
}

function TrackHeart({ spot, progress, width, win, scale, startVisible }: Shared & { spot: number }) {
  const d = useTransform([progress, width], ([p, w]: number[]) => {
    const cw = catWidth(w) * scale;
    const nose = runnerX(p, w, cw, win, startVisible) + cw * 0.85;
    return (nose - spot * w) / (w * 0.3);
  });
  const opacity = useTransform(d, [0, 0.06, 0.65, 1], [0, 1, 0.85, 0]);
  const y = useTransform(d, [0, 1], [0, -80]);
  const s = useTransform(d, [0, 0.15, 1], [0.3, 1.15, 0.85]);
  return (
    <motion.span style={{ opacity, y, scale: s, left: `${spot * 100}%` }} className="absolute bottom-10 block size-5">
      <HeartIcon className="size-full" />
    </motion.span>
  );
}

function ChaseHeart({ progress, width, win, scale, startVisible }: Shared) {
  const x = useTransform([progress, width], ([p, w]: number[]) => {
    const cw = catWidth(w) * scale;
    return runnerX(p, w, cw, win, startVisible) + cw * 1.12;
  });
  return (
    <motion.div style={{ x }} className="absolute bottom-12 left-0">
      <span className="heart-bob block size-5">
        <HeartIcon className="size-full" />
      </span>
    </motion.div>
  );
}

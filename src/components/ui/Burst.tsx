"use client";

import { motion } from "motion/react";
import { HeartIcon, PawPrint } from "@/components/decorations/Doodles";
import { cn } from "@/lib/utils";

const COLORS = ["#FF6FA3", "#FF9EC4", "#E94F87", "#FFB6D5", "#C8A8F5"];

/**
 * A small, self-contained puff of hearts or paw prints. Mount it with a
 * unique key to play it once; the parent removes it afterwards.
 */
export function Burst({
  kind = "hearts",
  count = 6,
  seed = 0,
  className,
}: {
  kind?: "hearts" | "paws";
  count?: number;
  seed?: number;
  className?: string;
}) {
  return (
    <div className={cn("pointer-events-none absolute left-1/2 top-1/3 z-20", className)} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + seed * 0.37;
        const dist = 36 + ((seed + i * 7) % 4) * 8;
        const color = COLORS[(i + seed) % COLORS.length];
        return (
          <motion.span
            key={i}
            className="absolute -ml-2 -mt-2 block size-4"
            style={{ color }}
            initial={{ x: 0, y: 0, scale: 0.3, opacity: 1, rotate: 0 }}
            animate={{
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist - 20,
              scale: 1,
              opacity: 0,
              rotate: (i % 2 ? 1 : -1) * 25,
            }}
            transition={{ duration: 0.95, ease: "easeOut" }}
          >
            {kind === "paws" ? <PawPrint className="size-full" /> : <HeartIcon className="size-full" color={color} />}
          </motion.span>
        );
      })}
    </div>
  );
}

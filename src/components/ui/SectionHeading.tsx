"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EmphasisLines, HeartIcon } from "@/components/decorations/Doodles";
import { fadeUp, stagger, viewportOnce } from "@/lib/animation";
import { cn } from "@/lib/utils";
import { RichText } from "./RichText";

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  /** Flank the title with hearts, like "♥ Our Gallery ♥". */
  hearts?: boolean;
  /** Slot for a cat or doodle sitting beside the title. */
  side?: ReactNode;
  className?: string;
}

export function SectionHeading({ id, title, subtitle, hearts = false, side, className }: SectionHeadingProps) {
  return (
    <motion.div
      className={cn("relative mx-auto mb-10 max-w-3xl px-4 text-center sm:mb-14", className)}
      variants={stagger(0.12)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <motion.div variants={fadeUp} className="relative inline-flex items-center justify-center gap-2 sm:gap-4">
        <EmphasisLines className="hidden h-7 w-7 text-berry/70 sm:block" />
        {hearts && <HeartIcon className="size-6 sm:size-8" />}
        <h2 id={id} className="font-hand text-[2.1rem] font-bold leading-tight text-plum sm:text-5xl">
          <RichText text={title} heartClassName="text-berry" />
        </h2>
        {hearts && <HeartIcon className="size-6 sm:size-8" />}
        <EmphasisLines flip className="hidden h-7 w-7 text-berry/70 sm:block" />
        {side}
      </motion.div>
      {subtitle && (
        <motion.p variants={fadeUp} className="mt-3 text-balance font-hand text-base text-plum-soft sm:text-lg">
          <RichText text={subtitle} heartClassName="text-berry" />
        </motion.p>
      )}
    </motion.div>
  );
}

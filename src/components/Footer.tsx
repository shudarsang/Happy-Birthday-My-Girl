"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { Cat } from "@/components/cats/Cat";
import { RunningCatTrack } from "@/components/cats/RunningCat";
import { DoubleHeart, HeartIcon } from "@/components/decorations/Doodles";
import { RichText } from "@/components/ui/RichText";
import { siteConfig } from "@/data/siteConfig";
import { ease, spring } from "@/lib/animation";

const RISING = [
  { dx: "-14px", dur: 4.2, delay: 0, size: "size-4" },
  { dx: "10px", dur: 3.6, delay: 1.3, size: "size-3" },
  { dx: "-4px", dur: 4.6, delay: 2.5, size: "size-5" },
];

export function Footer() {
  const { footer } = siteConfig;

  return (
    <footer
      data-pause-offscreen
      className="relative overflow-hidden bg-gradient-to-b from-blush via-[#FFD3E4] to-petal/90 pb-10 pt-28 text-center"
    >
      <RunningCatTrack runners={[{ variant: "tuxedo" }]} chaseHeart className="top-0" />

      {/* Two cats sitting together; they pop up as you reach the bottom */}
      <div className="relative mx-auto flex w-fit items-end justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ ...spring.bouncy, delay: 0.1 }}
        >
          <Cat variant="white" accessory="bow" blink={4.2} tail={2.6} className="w-20 sm:w-24" />
        </motion.div>
        <div aria-hidden="true" className="relative -mx-2 mb-14 h-12 w-6">
          {RISING.map((h, i) => (
            <span
              key={i}
              className={`heart-rise absolute bottom-0 left-1/2 -ml-2 block ${h.size}`}
              style={{ "--dx": h.dx, "--dur": `${h.dur}s`, "--delay": `${h.delay}s` } as CSSProperties}
            >
              <HeartIcon className="size-full" />
            </span>
          ))}
        </div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ ...spring.bouncy, delay: 0.3 }}
        >
          <Cat variant="gray" accessory="ribbon" blink={5.3} blinkDelay={0.8} tail={3.1} className="w-[72px] sm:w-[88px]" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: ease.soft }}
        className="relative px-4"
      >
        <p className="mt-6 flex items-center justify-center gap-3 font-hand text-xl font-semibold text-plum sm:text-3xl">
          <span aria-hidden="true" className="hidden h-0.5 w-10 shrink-0 rounded-full bg-plum/50 sm:block" />
          <span className="text-balance">
            <RichText text={footer.line} heartClassName="text-berry" />
          </span>
          <span aria-hidden="true" className="hidden h-0.5 w-10 shrink-0 rounded-full bg-plum/50 sm:block" />
        </p>
        <p className="mt-3 font-letter text-xl text-plum-soft sm:text-2xl">
          <RichText text={footer.closing} heartClassName="text-berry" />
        </p>
      </motion.div>

      <HeartIcon className="float-soft absolute bottom-8 left-[5%] size-8 opacity-90" color="#FF7FAF" />
      <HeartIcon className="float-soft absolute left-[16%] top-[38%] hidden size-5 [--delay:1s] sm:block" color="#FFFFFF" />
      <DoubleHeart className="float-soft absolute bottom-8 right-[5%] w-14 text-berry/80 [--delay:0.6s] sm:w-20" />
    </footer>
  );
}

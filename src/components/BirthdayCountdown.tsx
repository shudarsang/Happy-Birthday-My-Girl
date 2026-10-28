"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Cat } from "@/components/cats/Cat";
import { EmphasisLines, HeartIcon, HeartOutline, Squiggle } from "@/components/decorations/Doodles";
import { useIntroDone } from "@/components/intro/IntroProvider";
import { Burst } from "@/components/ui/Burst";
import { RichText } from "@/components/ui/RichText";
import { siteConfig } from "@/data/siteConfig";
import { useBirthdayCountdown, type CountdownStatus } from "@/hooks/useBirthdayCountdown";
import { ease } from "@/lib/animation";
import { cn } from "@/lib/utils";

const headings: Record<CountdownStatus, string> = {
  counting: siteConfig.countdown.heading,
  today: siteConfig.countdown.todayHeading,
  after: siteConfig.countdown.afterHeading,
};

function Unit({ value, label, ready }: { value: number; label: string; ready: boolean }) {
  const text = ready ? String(value).padStart(2, "0") : "--";
  return (
    <div className="flex flex-col items-center">
      <span className="relative block h-[1.1em] w-full overflow-hidden text-center font-hand text-[2rem] font-bold leading-[1.1] text-berry sm:text-[2.35rem]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="block"
            initial={{ y: "-70%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "70%", opacity: 0 }}
            transition={{ duration: 0.35, ease: ease.soft }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="mt-1 text-xs font-bold text-plum sm:text-[0.8rem]">{label}</span>
    </div>
  );
}

export function BirthdayCountdown({ className }: { className?: string }) {
  const c = useBirthdayCountdown(siteConfig.birthday.iso);
  const introDone = useIntroDone();
  const [celebrations, setCelebrations] = useState<number[]>([]);
  const celebrated = useRef(false);

  // A little heart shower the moment the birthday arrives (or on load during the
  // day, once the opening greeting has been dismissed).
  useEffect(() => {
    if (!introDone || !c.ready || c.status !== "today" || celebrated.current) return;
    celebrated.current = true;
    const ids = [1, 2, 3].map((n) => Date.now() + n);
    setCelebrations(ids);
    const t = window.setTimeout(() => setCelebrations([]), 2600);
    return () => window.clearTimeout(t);
  }, [introDone, c.ready, c.status]);

  const units = [
    { label: "Days", value: c.days },
    { label: "Hours", value: c.hours },
    { label: "Minutes", value: c.minutes },
    { label: "Seconds", value: c.seconds },
  ];
  const isBirthday = c.ready && c.status !== "counting";

  return (
    <div className={cn("relative mx-auto w-full max-w-[350px]", className)}>
      {/* Little heart with emphasis lines, like the reference */}
      <div aria-hidden="true" className="absolute -top-14 left-[38%] flex flex-col items-center">
        <EmphasisLines className="h-5 w-5 rotate-90 text-berry/70" />
        <HeartIcon className="float-soft size-6" />
      </div>

      <Cat
        variant="sakura"
        pose="sit"
        wave
        blink={3.8}
        tail={2.4}
        className="absolute -top-[60px] right-5 z-10 w-[58px]"
      />

      <div
        role="timer"
        aria-label={`Countdown to ${siteConfig.birthday.display}`}
        className={cn(
          "relative overflow-hidden rounded-[28px] border border-white bg-gradient-to-br from-white/90 via-white/80 to-blush/80 px-4 pb-6 pt-6 shadow-card backdrop-blur-sm sm:px-6",
          isBirthday && "ring-2 ring-petal",
        )}
      >
        <h2
          className={cn(
            "text-balance text-center font-hand font-semibold text-plum",
            isBirthday ? "text-base sm:text-[1.1rem]" : "text-lg sm:text-xl",
          )}
        >
          <RichText text={headings[c.status]} heartClassName="text-berry" />
        </h2>
        <div className="mt-4 grid grid-cols-4 divide-x-2 divide-petal/60">
          {units.map((u) => (
            <Unit key={u.label} {...u} ready={c.ready} />
          ))}
        </div>
        {celebrations.map((id) => (
          <Burst key={id} seed={id % 50} count={8} className="top-1/2" />
        ))}
      </div>

      <div aria-hidden="true" className="mx-auto mt-3 flex w-40 items-center justify-center gap-1 text-berry/70">
        <Squiggle className="h-3 w-28" />
        <HeartOutline className="heart-bob size-6 text-berry" />
      </div>
    </div>
  );
}

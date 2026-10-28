"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { CalendarHeart, Heart } from "lucide-react";
import { BirthdayCountdown } from "@/components/BirthdayCountdown";
import { Cat } from "@/components/cats/Cat";
import { HeartChase, PeekingCat, SleepyCat } from "@/components/cats/CatDecorations";
import { RunningCatTrack } from "@/components/cats/RunningCat";
import { CloudDivider } from "@/components/decorations/CloudDivider";
import { BigBow, Cloud, CloudBank, EmphasisLines, HeartOutline, Squiggle } from "@/components/decorations/Doodles";
import { FloatingHearts, type FloatItem } from "@/components/decorations/FloatingHearts";
import { RichText } from "@/components/ui/RichText";
import { siteConfig } from "@/data/siteConfig";
import { ease, fadeUp, stagger } from "@/lib/animation";

const floats: FloatItem[] = [
  { kind: "heart", top: "17%", left: "2%", size: 34, rot: -14, dur: 6.5 },
  { kind: "outline", top: "33%", left: "6.5%", size: 22, rot: 8, dur: 7, delay: 1 },
  { kind: "heart", top: "60%", left: "1.5%", size: 18, rot: 10, dur: 5.5, delay: 0.5 },
  { kind: "outline", top: "20%", left: "33%", size: 26, rot: -10, dur: 6.2, delay: 1.2, hideOnMobile: true },
  { kind: "heart", top: "14%", left: "66%", size: 40, rot: 12, dur: 7.5, color: "#FFC2DA", hideOnMobile: true },
  { kind: "heart", top: "26%", left: "76%", size: 32, rot: -8, dur: 6, delay: 0.8, hideOnMobile: true },
  { kind: "heart", top: "72%", left: "70%", size: 36, rot: -6, dur: 6.8, color: "#FFC2DA", hideOnMobile: true },
  { kind: "heart", top: "8%", left: "90%", size: 20, rot: 12, dur: 5.8, delay: 0.4 },
  { kind: "heart", top: "48%", left: "93%", size: 18, rot: -12, dur: 6.4, delay: 1.6, color: "#FF9EC4" },
  { kind: "sparkle", top: "15%", left: "52%", size: 16, dur: 2.6 },
  { kind: "sparkle", top: "56%", left: "38%", size: 12, dur: 3.2, delay: 0.8, hideOnMobile: true },
  { kind: "sparkle", top: "38%", left: "88%", size: 14, dur: 2.9, delay: 1.4 },
  { kind: "sparkle", top: "80%", left: "20%", size: 12, dur: 3.4, delay: 0.3 },
];

export function Hero() {
  const { hero, birthday } = siteConfig;

  return (
    <section
      id="home"
      data-pause-offscreen
      aria-labelledby="hero-title"
      className="bg-hero relative overflow-hidden pt-24 sm:pt-28 lg:pt-24"
    >
      <FloatingHearts items={floats} />
      <BigBow className="sway pointer-events-none absolute -right-3 top-14 hidden w-40 lg:block xl:w-48" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-x-4 gap-y-16 px-4 pb-40 sm:px-6 lg:min-h-[620px] lg:grid-cols-[1fr_1.12fr_0.8fr] lg:pb-32">
        {/* ── Illustration ── */}
        <motion.div
          className="relative order-3 mx-auto w-full max-w-[520px] lg:order-1 lg:self-end"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: ease.soft, delay: 0.2 }}
        >
          <Cloud color="#FFD3E3" className="absolute -bottom-5 -left-[8%] w-[55%] opacity-80" />
          <Image
            src={hero.illustration.src}
            alt={hero.illustration.alt}
            width={hero.illustration.width}
            height={hero.illustration.height}
            preload
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 520px, 92vw"
            className="illustration-mask relative h-auto w-full select-none"
          />
          <CloudBank color="#FFF5F8" className="absolute -bottom-3 -left-[6%] h-12 w-[112%] opacity-95 sm:h-14" />
          <Cat
            variant="cream"
            accessory="bow"
            blink={5.1}
            blinkDelay={1}
            tail={3.2}
            className="absolute -bottom-3 right-[-2%] w-16 sm:w-[72px]"
          />
        </motion.div>

        {/* ── Birthday text ── */}
        <motion.div
          className="relative order-1 text-center lg:order-2"
          variants={stagger(0.12, 0.15)}
          initial="hidden"
          animate="show"
        >
          <motion.p variants={fadeUp} className="font-hand text-lg text-plum sm:text-xl lg:text-[1.4rem]">
            <RichText text={hero.intro} heartClassName="text-berry" />
          </motion.p>

          <motion.h1 variants={fadeUp} id="hero-title" className="relative mt-3 font-script leading-[0.95]">
            {/* Tiny kitten peeking up from behind the heading */}
            <PeekingCat variant="gray" className="-top-[34px] right-[2%] w-[52px] sm:right-[6%]" delay={2} duration={8.5} />
            <span className="relative block whitespace-nowrap text-[clamp(3rem,14vw,5.4rem)] text-plum drop-shadow-[0_3px_0_rgb(255_255_255/0.8)] lg:text-[clamp(3.6rem,5.5vw,5.6rem)]">
              {hero.headingTop}
            </span>
            <span className="relative mt-1 inline-block whitespace-nowrap pl-[10%] text-[clamp(3.2rem,15vw,5.8rem)] text-berry drop-shadow-[0_3px_0_rgb(255_255_255/0.8)] lg:text-[clamp(3.9rem,6vw,6.1rem)]">
              {hero.headingBottom}
              <Squiggle className="absolute -bottom-1 left-[14%] h-3 w-[66%] text-berry sm:h-4" />
              <HeartOutline className="heart-bob absolute -right-10 bottom-1 size-10 text-berry sm:-right-14 sm:size-12" strokeWidth={2.4} />
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-7 font-hand text-[0.95rem] leading-relaxed text-plum sm:text-lg">
            {hero.message.map((line, i) => (
              <span key={i} className="block text-balance">
                <RichText text={line} heartClassName="text-berry" />
              </span>
            ))}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-7 flex items-center justify-center gap-2">
            <EmphasisLines className="h-6 w-6 text-berry/70" />
            <p className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-gradient-to-r from-petal/80 to-[#FFC7DD] px-6 py-3 font-hand text-lg font-bold text-plum shadow-soft">
              <CalendarHeart className="size-5 text-plum" aria-hidden="true" />
              <time dateTime={birthday.iso}>{birthday.display}</time>
              <Heart className="size-5 fill-berry text-berry" aria-hidden="true" />
            </p>
            <EmphasisLines flip className="h-6 w-6 text-berry/70" />
          </motion.div>
        </motion.div>

        {/* ── Countdown ── */}
        <motion.div
          className="relative order-2 pt-8 lg:order-3 lg:pt-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease.soft, delay: 0.55 }}
        >
          <BirthdayCountdown />
        </motion.div>
      </div>

      {/* Kitten chasing a floating heart (roomy screens only) */}
      <HeartChase variant="orange" className="left-[9%] top-[96px] hidden xl:block" />

      {/* Sleepy kitty on a cloud */}
      <div className="pointer-events-none absolute bottom-[54px] right-[2%] hidden w-44 sm:block lg:bottom-[70px] lg:w-52">
        <Cloud color="#FFFFFF" className="absolute -bottom-5 left-[-10%] w-[120%] opacity-95" />
        <SleepyCat variant="tuxedo" className="pointer-events-auto relative mx-auto w-[62%]" />
      </div>

      <RunningCatTrack
        runners={[{ variant: "white", accessory: "bow" }]}
        startVisible
        hearts
        hint="Scroll with me! ♡"
        className="bottom-6 sm:bottom-10"
      />
      <CloudDivider fill="#FFF5F8" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}

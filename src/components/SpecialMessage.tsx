"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Gift, Sparkles } from "lucide-react";
import { Cat } from "@/components/cats/Cat";
import { ClimbingCat } from "@/components/cats/CatDecorations";
import { RunningCatTrack } from "@/components/cats/RunningCat";
import { CloudDivider } from "@/components/decorations/CloudDivider";
import { HeartIcon, HeartOutline } from "@/components/decorations/Doodles";
import { FloatingHearts, type FloatItem } from "@/components/decorations/FloatingHearts";
import { Burst } from "@/components/ui/Burst";
import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/siteConfig";
import { ease, viewportOnce } from "@/lib/animation";

const floats: FloatItem[] = [
  { kind: "heart", top: "18%", left: "8%", size: 30, rot: -12, dur: 6.4 },
  { kind: "sparkle", top: "30%", left: "88%", size: 16, dur: 2.8 },
  { kind: "outline", top: "64%", left: "92%", size: 28, rot: 10, dur: 7, delay: 0.7 },
  { kind: "heart", top: "78%", left: "5%", size: 22, rot: 8, dur: 5.8, delay: 1.1, color: "#E9DDFB" },
  { kind: "sparkle", top: "52%", left: "4%", size: 12, dur: 3.3, delay: 0.5 },
];

export function SpecialMessage() {
  const { message } = siteConfig;
  const [open, setOpen] = useState(false);
  const [bursts, setBursts] = useState<number[]>([]);

  const toggle = () => {
    setOpen((o) => !o);
    if (!open) {
      const id = Date.now();
      setBursts((b) => [...b.slice(-1), id]);
      window.setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1100);
    }
  };

  return (
    <section
      id="message"
      data-pause-offscreen
      aria-labelledby="message-title"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFEFF5] via-blush to-[#FFE6F0] pb-28 pt-28 sm:pb-32"
    >
      <FloatingHearts items={floats} />
      <RunningCatTrack runners={[{ variant: "cream", accessory: "heart" }]} hearts className="top-0" />

      <SectionHeading id="message-title" title={message.title} className="mb-[5.5rem] md:mb-14" />

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        {/* A kitten holding a heart — tap it and the heart floats away */}
        <Cat
          variant="white"
          accessory="heart"
          blink={4.4}
          tail={2.6}
          phrases={["This is for you ♡", "I love you! ♡", "Meow! ♡"]}
          className="absolute -top-[68px] right-8 z-10 w-16 md:-left-[5.5rem] md:bottom-10 md:right-auto md:top-auto md:w-20"
        />
        <ClimbingCat variant="orange" className="-right-16 inset-y-10 hidden md:block" />

        <motion.article
          className="letter-paper relative rounded-[30px] border border-white pb-8 pl-[3.6rem] pr-6 pt-[2.45rem] shadow-card sm:pl-[4.2rem] sm:pr-12"
          initial={{ opacity: 0, y: 40, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: ease.soft }}
        >
          <span aria-hidden="true" className="washi absolute -top-3 left-10 h-7 w-24 -rotate-6 rounded-sm shadow-sm" />
          <span aria-hidden="true" className="washi absolute -top-3 right-10 h-7 w-20 rotate-[8deg] rounded-sm shadow-sm" />
          <HeartOutline className="absolute bottom-5 right-6 size-9 rotate-12 text-petal-deep" />

          <div className="font-letter text-[1.6rem] leading-[2.45rem] text-plum sm:text-[1.8rem]">
            <p className="font-semibold">{message.greeting}</p>
            {message.paragraphs.map((p, i) => (
              <p key={i} className="mt-[2.45rem]">
                <RichText text={p} heartClassName="text-berry" />
              </p>
            ))}
            <p className="mt-[2.45rem] font-semibold text-berry">
              <RichText text={message.closing} />
            </p>
            <p className="pr-10 text-right text-plum-soft">
              <RichText text={message.signature} heartClassName="text-berry" />
            </p>
          </div>

          <div className="relative mt-8 flex justify-center">
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="surprise-panel"
              className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-[#C93370] to-[#D9477F] px-7 py-3 font-hand text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-card active:translate-y-0"
            >
              <Gift className="size-5 transition-transform group-hover:-rotate-12 group-hover:scale-110" aria-hidden="true" />
              {open ? message.surpriseHideButton : message.surpriseButton}
            </button>
            {bursts.map((id) => (
              <Burst key={id} seed={id % 61} count={10} className="top-1/2" />
            ))}
          </div>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id="surprise-panel"
                key="surprise"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.55, ease: ease.soft }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ y: 16, scale: 0.97 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: ease.soft, delay: 0.1 }}
                  className="relative mt-6 rounded-3xl border border-white bg-gradient-to-br from-lilac/80 via-white/70 to-blush p-6 text-center shadow-soft"
                >
                  <Sparkles className="mx-auto size-6 text-berry" aria-hidden="true" />
                  <p className="mt-2 font-hand text-lg font-bold text-plum">
                    <RichText text={message.surprise.title} heartClassName="text-berry" />
                  </p>
                  <p className="mt-2 font-letter text-[1.45rem] leading-snug text-plum">
                    <RichText text={message.surprise.text} heartClassName="text-berry" />
                  </p>
                  <div aria-hidden="true" className="mt-3 flex justify-center gap-2">
                    <HeartIcon className="heart-bob size-5" />
                    <HeartIcon className="heart-bob size-4 [animation-delay:0.3s]" color="#FF9EC4" />
                    <HeartIcon className="heart-bob size-5 [animation-delay:0.6s]" />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.article>
      </div>

      <CloudDivider fill="#FFE3EE" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}

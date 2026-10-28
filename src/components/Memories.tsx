"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CalendarHeart } from "lucide-react";
import { EdgePeekCat, JumpingCat, SleepyCat, TimelineKitten } from "@/components/cats/CatDecorations";
import { RunningCatTrack } from "@/components/cats/RunningCat";
import { CloudDivider } from "@/components/decorations/CloudDivider";
import { Flower, HeartIcon, PawPrint } from "@/components/decorations/Doodles";
import { FloatingHearts, type FloatItem } from "@/components/decorations/FloatingHearts";
import { RichText } from "@/components/ui/RichText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { memories, type Memory } from "@/data/memories";
import { siteConfig } from "@/data/siteConfig";
import { ease } from "@/lib/animation";
import { cn } from "@/lib/utils";

const floats: FloatItem[] = [
  { kind: "outline", top: "12%", left: "6%", size: 26, rot: -10, dur: 7 },
  { kind: "heart", top: "40%", left: "93%", size: 22, rot: 12, dur: 6, color: "#FFC2DA" },
  { kind: "heart", top: "72%", left: "4%", size: 18, rot: -6, dur: 6.6, delay: 1, color: "#E9DDFB" },
  { kind: "outline", top: "86%", left: "90%", size: 24, rot: 8, dur: 7.4, delay: 0.6 },
];

function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  const right = index % 2 === 1;
  return (
    <li
      className={cn(
        "relative grid md:grid-cols-2 md:gap-x-28",
        index > 0 && "md:-mt-48",
        index === 2 && "pt-10 md:pt-0",
      )}
    >
      {/* heart on the timeline */}
      <span
        aria-hidden="true"
        className="absolute left-6 top-8 z-[5] grid size-9 -translate-x-1/2 place-items-center rounded-full bg-white shadow-soft ring-4 ring-blush md:left-1/2"
      >
        <HeartIcon className="size-4" />
      </span>

      <motion.article
        className={cn(
          "relative ml-14 rounded-[26px] border border-white bg-white/90 p-3 shadow-card backdrop-blur-sm sm:p-4 md:ml-0",
          right ? "md:col-start-2" : "md:col-start-1",
        )}
        initial={{ opacity: 0, x: right ? 50 : -50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: ease.soft }}
      >
        {index === 2 && <JumpingCat variant="sakura" className="-top-[66px] right-6" />}
        <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-blush">
          <Image
            src={memory.photo.src}
            alt={memory.photo.alt}
            fill
            sizes="(min-width: 768px) 440px, 90vw"
            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
            style={{ objectPosition: memory.photo.focus }}
          />
        </div>
        <div className="px-1.5 pb-1 pt-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="font-hand text-xl font-bold text-plum sm:text-2xl">{memory.title}</h3>
            {memory.date && (
              <p className="inline-flex items-center gap-1.5 rounded-full bg-blush px-3 py-1 text-xs font-bold text-plum-soft">
                <CalendarHeart className="size-3.5" aria-hidden="true" />
                {memory.date}
              </p>
            )}
          </div>
          <p className="mt-2 leading-relaxed text-plum-soft">
            <RichText text={memory.caption} heartClassName="text-berry" />
          </p>
        </div>
        {index % 2 === 0 ? (
          <PawPrint className="absolute -bottom-3 right-6 size-5 rotate-12 text-petal-deep/70" />
        ) : (
          <Flower className="absolute -left-3 -top-3 size-8 -rotate-12" color="#FFC2DA" />
        )}
      </motion.article>
    </li>
  );
}

export function Memories() {
  const { memories: copy } = siteConfig;
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="memories"
      data-pause-offscreen
      aria-labelledby="memories-title"
      className="relative overflow-hidden bg-gradient-to-b from-cream via-[#FFF8FA] to-shell pb-32 pt-28"
    >
      <FloatingHearts items={floats} />

      {/* Two kittens chasing each other across the top of the section */}
      <RunningCatTrack
        runners={[
          { variant: "orange", window: [0, 0.82] },
          { variant: "gray", accessory: "ribbon", window: [0.13, 1], scale: 0.9 },
        ]}
        className="top-0"
      />

      <EdgePeekCat variant="white" className="top-[28%]" />

      <SectionHeading
        id="memories-title"
        title={copy.title}
        subtitle={copy.subtitle}
        side={<SleepyCat variant="orange" stretchOnView className="absolute -bottom-2 -right-20 hidden w-[84px] sm:block" />}
      />

      <div ref={timelineRef} className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <div aria-hidden="true" className="dotted-line absolute inset-y-0 left-10 w-1.5 -translate-x-1/2 sm:left-12 md:left-1/2" />
        <TimelineKitten containerRef={timelineRef} variant="gray" className="left-10 sm:left-12 md:left-1/2" />
        <ol className="relative grid gap-12">
          {memories.map((m, i) => (
            <MemoryCard key={m.title + i} memory={m} index={i} />
          ))}
        </ol>
      </div>

      <CloudDivider fill="#FFEFF5" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}

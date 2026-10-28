"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Images } from "lucide-react";
import { Cat } from "@/components/cats/Cat";
import { PeekingCat, SlideOutCat, StrollingCat } from "@/components/cats/CatDecorations";
import { CloudDivider } from "@/components/decorations/CloudDivider";
import { EmphasisLines, HeartIcon, HeartOutline, PawPrint } from "@/components/decorations/Doodles";
import { PhotoLightbox } from "@/components/PhotoLightbox";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { photos, type Photo } from "@/data/photos";
import { siteConfig } from "@/data/siteConfig";
import { ease, spring } from "@/lib/animation";
import { cn } from "@/lib/utils";

const ROTATIONS = [-5, 3, -2.5, 4, -3.5, 2.5, -4, 3.5];

function FrameDoodles({ index }: { index: number }) {
  switch (index % 5) {
    case 0:
      return <HeartOutline className="pointer-events-none absolute -right-4 -top-6 size-10 rotate-12 text-petal-deep" />;
    case 2:
      return (
        <span className="pointer-events-none absolute -bottom-5 -left-3 flex -rotate-12 gap-1 text-petal-deep/80" aria-hidden="true">
          <PawPrint className="size-3.5" />
          <PawPrint className="mt-2 size-3.5" />
        </span>
      );
    case 4:
      return (
        <span className="pointer-events-none absolute -right-5 -top-5 flex rotate-6" aria-hidden="true">
          <HeartOutline className="size-10 text-berry/70" />
          <HeartOutline className="-ml-3 mt-4 size-5 text-berry/60" />
        </span>
      );
    default:
      return null;
  }
}

function Polaroid({ photo, index, onOpen }: { photo: Photo; index: number; onOpen: () => void }) {
  const rotate = ROTATIONS[index % ROTATIONS.length];
  return (
    <motion.li
      className="relative isolate w-[calc(50%-10px)] max-w-[250px] sm:w-[calc(33.333%-22px)] lg:w-[calc(20%-26px)]"
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: ease.soft, delay: (index % 5) * 0.09 }}
    >
      {/* Cats live *behind* the frames, so they never cover a photo. */}
      {index === 1 && <PeekingCat variant="orange" className="-top-[40px] left-[20%] z-[-1] w-[58px]" delay={3} duration={10} />}
      {index === 3 && <SlideOutCat variant="tuxedo" className="right-0 top-[18%] hidden sm:block" />}

      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`View photo: ${photo.alt}`}
        className="group relative block w-full rounded-[10px] bg-white p-2 pb-9 text-left shadow-polaroid transition-shadow duration-300 hover:shadow-polaroid-lg focus-visible:shadow-polaroid-lg sm:p-2.5 sm:pb-10"
        initial={false}
        animate={{ rotate }}
        whileHover={{ rotate: 0, scale: 1.05, y: -6 }}
        whileFocus={{ rotate: 0, scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
        transition={spring.gentle}
      >
        <span className="relative block aspect-square overflow-hidden rounded-[6px] bg-blush">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 240px, (min-width: 640px) 30vw, 46vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ objectPosition: photo.focus }}
          />
        </span>
        {photo.caption && (
          <span className="absolute inset-x-2 bottom-1.5 truncate text-center font-letter text-lg text-plum-soft sm:bottom-2 sm:text-xl">
            {photo.caption}
          </span>
        )}
        <span
          aria-hidden="true"
          className="absolute -right-3 -top-3 scale-0 -rotate-12 transition duration-300 group-hover:scale-100 group-hover:rotate-6 group-focus-visible:scale-100"
        >
          <HeartIcon className="size-8 drop-shadow-[0_3px_4px_rgb(233_79_135/0.35)]" />
        </span>
      </motion.button>

      <FrameDoodles index={index} />
    </motion.li>
  );
}

export function Gallery() {
  const { gallery } = siteConfig;
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const hasMore = photos.length > gallery.initialCount;
  const visible = expanded ? photos : photos.slice(0, gallery.initialCount);

  return (
    <section
      id="gallery"
      data-pause-offscreen
      aria-labelledby="gallery-title"
      className="relative bg-shell pb-40 pt-6 sm:pb-44 sm:pt-8"
    >
      <SectionHeading
        id="gallery-title"
        title={gallery.title}
        subtitle={gallery.subtitle}
        hearts
        side={
          <Cat
            variant="gray"
            blink={4.3}
            blinkDelay={0.6}
            tail={2.2}
            className="absolute -right-12 bottom-0 w-11 sm:-right-[4.5rem] sm:w-14"
          />
        }
      />

      <ul className="relative mx-auto flex max-w-7xl flex-wrap justify-center gap-x-5 gap-y-9 px-4 sm:gap-x-8 sm:gap-y-12 sm:px-6">
        <AnimatePresence initial={false}>
          {visible.map((photo, i) => (
            <Polaroid key={photo.src} photo={photo} index={i} onOpen={() => setOpenIndex(i)} />
          ))}
        </AnimatePresence>
      </ul>

      {hasMore && (
        <div className="mt-14 flex items-center justify-center gap-2">
          <EmphasisLines className="h-6 w-6 text-berry/70" />
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/80 bg-gradient-to-r from-petal/80 to-[#FFC7DD] px-7 py-3 font-hand text-base font-bold text-plum shadow-soft transition hover:-translate-y-0.5 hover:shadow-card active:translate-y-0"
          >
            <Images className="size-5" aria-hidden="true" />
            {expanded ? "Show Fewer Photos" : "View More Photos"}
            <ChevronRight
              className={cn("size-4 transition-transform", expanded ? "-rotate-90" : "group-hover:translate-x-1")}
              aria-hidden="true"
            />
          </button>
          <EmphasisLines flip className="h-6 w-6 text-berry/70" />
        </div>
      )}

      <StrollingCat variant="cream" className="bottom-16 sm:bottom-20" />

      <PhotoLightbox photos={photos} index={openIndex} onClose={() => setOpenIndex(null)} onChange={setOpenIndex} />
      <CloudDivider fill="#FFFDF8" className="absolute inset-x-0 bottom-0" />
    </section>
  );
}

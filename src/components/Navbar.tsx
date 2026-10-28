"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Gift, Heart, House, Images, Menu, X, type LucideIcon } from "lucide-react";
import { CatFigure } from "@/components/cats/CatFigure";
import { InlineHeart, LogoHeart } from "@/components/decorations/Doodles";
import { useIntroDone } from "@/components/intro/IntroProvider";
import { Burst } from "@/components/ui/Burst";
import { navItems, siteConfig, type NavId } from "@/data/siteConfig";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ease, spring } from "@/lib/animation";
import { cn } from "@/lib/utils";

const icons: Record<NavId, LucideIcon> = { home: House, gallery: Images, memories: Heart, message: Gift };
const sectionIds = navItems.map((item) => item.id);

/** A tiny white kitten that pops up from the bottom edge of the nav pill. */
function NavCat() {
  return (
    <span aria-hidden="true" className="relative block h-[31px] w-[44px] self-end overflow-hidden">
      <span
        className="peek-loop absolute inset-x-0 top-0 block"
        style={{ "--peek-dur": "8s", "--peek-delay": "1.2s" } as CSSProperties}
      >
        <CatFigure pose="peek" variant="white" accessory="bow" />
      </span>
    </span>
  );
}

export function Navbar() {
  const active = useActiveSection(sectionIds);
  const introDone = useIntroDone();
  const [open, setOpen] = useState(false);
  const [bursts, setBursts] = useState<number[]>([]);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const sendLove = () => {
    const id = Date.now();
    setBursts((b) => [...b.slice(-2), id]);
    window.setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 1000);
  };

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <motion.nav
        aria-label="Main"
        initial={{ y: -24, opacity: 0 }}
        animate={introDone ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
        transition={{ duration: 0.7, ease: ease.soft }}
        className="relative mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 rounded-full border border-white/80 bg-white/70 pl-3 pr-1.5 shadow-soft backdrop-blur-md sm:h-[60px] sm:pl-5"
      >
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 self-stretch rounded-full"
          aria-label={`${siteConfig.brand} — back to top`}
        >
          <LogoHeart className="wiggle-hover size-8 shrink-0" />
          <span className="whitespace-nowrap font-hand text-xl font-bold text-berry">
            {siteConfig.brand} <InlineHeart />
          </span>
          <NavCat />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const Icon = icons[item.id];
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "relative isolate flex items-center gap-2 rounded-full px-4 py-2 font-hand text-[0.95rem] font-semibold transition-colors",
                    isActive ? "text-berry" : "text-plum hover:text-berry",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-petal/75 to-blush shadow-[inset_0_0_0_1px_rgb(255_255_255/0.7)]"
                      transition={spring.gentle}
                    />
                  )}
                  <Icon className="size-[18px]" strokeWidth={2.2} aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center">
          <button
            type="button"
            onClick={sendLove}
            aria-label="Send a little love"
            className="relative grid size-11 place-items-center rounded-full text-berry transition hover:scale-110 hover:bg-blush active:scale-95"
          >
            <Heart className="size-6" strokeWidth={2.2} aria-hidden="true" />
            {bursts.map((id) => (
              <Burst key={id} seed={id % 89} className="top-1/2" />
            ))}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full text-plum transition hover:bg-blush lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: ease.soft }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl border border-white/80 bg-white/90 p-2 shadow-card backdrop-blur-md lg:hidden"
          >
            <ul className="grid gap-1">
              {navItems.map((item) => {
                const Icon = icons[item.id];
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "flex min-h-12 items-center gap-3 rounded-2xl px-4 font-hand text-lg font-semibold transition-colors",
                        isActive ? "bg-blush text-berry" : "text-plum hover:bg-shell",
                      )}
                    >
                      <Icon className="size-5" aria-hidden="true" />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

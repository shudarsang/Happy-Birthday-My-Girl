import type { Transition, Variants } from "motion/react";

/** Centralised motion settings so every section moves with the same "feel". */
export const ease = {
  soft: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const spring = {
  gentle: { type: "spring", stiffness: 170, damping: 22 } satisfies Transition,
  bouncy: { type: "spring", stiffness: 320, damping: 14 } satisfies Transition,
};

/** Viewport trigger used for one-time entrance animations. */
export const viewportOnce = { once: true, amount: 0.25 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: ease.soft } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: ease.soft } },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: spring.gentle },
};

export function stagger(staggerChildren = 0.1, delayChildren = 0): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren, delayChildren } },
  };
}

/** Running-cat tuning: how much scroll (in viewport heights) one dash takes. */
export const runnerConfig = {
  enterAt: 0.92,
  travel: 0.8,
  idleMs: 140,
} as const;

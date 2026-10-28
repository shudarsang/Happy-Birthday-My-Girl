"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/** Motion honours the visitor's "reduce motion" setting everywhere. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

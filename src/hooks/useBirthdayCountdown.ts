"use client";

import { useEffect, useMemo, useState } from "react";

export type CountdownStatus = "counting" | "today" | "after";

export interface Countdown {
  /** false until the first client-side tick (avoids server/client mismatch). */
  ready: boolean;
  status: CountdownStatus;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Live countdown to an absolute moment (an ISO string with offset, so the
 * target is the same instant for every visitor). Ticks on the second boundary
 * and never goes negative.
 */
export function useBirthdayCountdown(targetIso: string): Countdown {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    let timer: number;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      timer = window.setTimeout(tick, SECOND - (t % SECOND) + 5);
    };
    tick();
    return () => window.clearTimeout(timer);
  }, []);

  if (now === null) {
    return { ready: false, status: "counting", days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const remaining = Math.max(0, target - now);
  const status: CountdownStatus =
    remaining > 0 ? "counting" : now - target < DAY ? "today" : "after";

  return {
    ready: true,
    status,
    days: Math.floor(remaining / DAY),
    hours: Math.floor((remaining % DAY) / HOUR),
    minutes: Math.floor((remaining % HOUR) / MINUTE),
    seconds: Math.floor((remaining % MINUTE) / SECOND),
  };
}

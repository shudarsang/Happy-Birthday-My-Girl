import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { HeartIcon, HeartOutline, Sparkle } from "./Doodles";

/**
 * A small, fixed set of drifting hearts & sparkles (no random values, so the
 * server and client render identically). Positions are % of the parent.
 */
export interface FloatItem {
  kind: "heart" | "outline" | "sparkle";
  top: string;
  left: string;
  size: number;
  rot?: number;
  dur?: number;
  delay?: number;
  color?: string;
  hideOnMobile?: boolean;
}

export function FloatingHearts({ items, className }: { items: FloatItem[]; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      {items.map((it, i) => {
        const style = {
          top: it.top,
          left: it.left,
          width: it.size,
          height: it.size,
          "--rot": `${it.rot ?? 0}deg`,
          "--dur": `${it.dur ?? 6}s`,
          "--delay": `${it.delay ?? 0}s`,
        } as CSSProperties;
        const cls = cn("absolute", it.kind === "sparkle" ? "twinkle" : "float-soft", it.hideOnMobile && "hidden md:block");
        if (it.kind === "sparkle") {
          return <Sparkle key={i} className={cn(cls, "text-white")} style={style} />;
        }
        if (it.kind === "outline") {
          return (
            <span key={i} className={cls} style={{ ...style, color: it.color ?? "#FF7FAF" }}>
              <HeartOutline className="size-full" />
            </span>
          );
        }
        return (
          <span key={i} className={cls} style={style}>
            <HeartIcon className="size-full" color={it.color ?? "#FF7FAF"} />
          </span>
        );
      })}
    </div>
  );
}

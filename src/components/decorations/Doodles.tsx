import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Small hand-drawn decorations. All are purely decorative (aria-hidden). */

interface DoodleProps {
  className?: string;
  style?: CSSProperties;
}

const HEART_24 =
  "M12 21 C11.6 20.7 2 14.6 2 8.3 C2 5.1 4.5 2.8 7.4 2.8 C9.4 2.8 11 3.9 12 5.6 C13 3.9 14.6 2.8 16.6 2.8 C19.5 2.8 22 5.1 22 8.3 C22 14.6 12.4 20.7 12 21 Z";
const HEART_SKETCH =
  "M12 19.6 C7.5 16.4 3.2 12.9 3.4 8.4 C3.5 5.6 5.6 3.8 7.9 3.9 C9.8 4 11.2 5.3 12 7.1 C12.9 5.2 14.5 3.8 16.6 3.9 C19.2 4.1 20.9 6.2 20.6 8.9 C20.2 12.9 16.4 16.3 12 19.6 Z";

/** Glossy filled heart, like the stickers in the reference design. */
export function HeartIcon({ className, style, color = "#FF6FA3" }: DoodleProps & { color?: string }) {
  return (
    <svg viewBox="0 0 24 22" className={cn("block", className)} style={style} aria-hidden="true" focusable="false">
      <path d={HEART_24} fill={color} />
      <path d="M6.2 6 Q4.6 7.6 5.1 10" stroke="#fff" strokeWidth={1.7} strokeLinecap="round" fill="none" opacity={0.75} />
    </svg>
  );
}

/** Sketchy outlined heart. */
export function HeartOutline({ className, style, strokeWidth = 2 }: DoodleProps & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 22" className={cn("block", className)} style={style} aria-hidden="true" focusable="false">
      <path d={HEART_SKETCH} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path
        d="M11.2 18.4 C6.9 15.2 3.9 12.3 4.1 8.6"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        opacity={0.5}
      />
    </svg>
  );
}

/** The "♡" glyph, drawn so it matches the handwriting fonts. */
export function InlineHeart({ className }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 24 22"
      className={cn("inline-block h-[0.78em] w-[0.85em] -translate-y-[0.06em] align-middle", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d={HEART_SKETCH} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinejoin="round" />
    </svg>
  );
}

export function Sparkle({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("block", className)} style={style} aria-hidden="true" focusable="false">
      <path
        d="M12 1 C12.8 7.4 16.6 11.2 23 12 C16.6 12.8 12.8 16.6 12 23 C11.2 16.6 7.4 12.8 1 12 C7.4 11.2 11.2 7.4 12 1 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PawPrint({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("block", className)} style={style} aria-hidden="true" focusable="false">
      <g fill="currentColor">
        <ellipse cx="12" cy="16" rx="5.4" ry="4.4" />
        <circle cx="5.4" cy="10" r="2.3" />
        <circle cx="9.4" cy="5.8" r="2.4" />
        <circle cx="14.6" cy="5.8" r="2.4" />
        <circle cx="18.6" cy="10" r="2.3" />
      </g>
    </svg>
  );
}

export function Flower({ className, style, color = "#FFB6D5" }: DoodleProps & { color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("block", className)} style={style} aria-hidden="true" focusable="false">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx="12" cy="6.2" rx="3.6" ry="5" fill={color} transform={`rotate(${deg} 12 12)`} />
      ))}
      <circle cx="12" cy="12" r="3" fill="#FFD66B" />
    </svg>
  );
}

/** Little "\ | /" emphasis strokes from the reference headings. */
export function EmphasisLines({ className, style, flip = false }: DoodleProps & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 30 30"
      className={cn("block", flip && "-scale-x-100", className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 5 L13 11 M2 15.5 L14 15.5 M4 26 L13 20" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" />
    </svg>
  );
}

export function Squiggle({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 22" className={cn("block", className)} style={style} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path d="M4 15 C40 5 84 4 122 10 S178 17 196 7" stroke="currentColor" strokeWidth={5.5} strokeLinecap="round" fill="none" />
    </svg>
  );
}

/** Two interlinked outline hearts (logo + footer corner). */
export function DoubleHeart({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 44 32" className={cn("block", className)} style={style} aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinejoin="round">
        <path d="M14 28 C8 23.6 2.6 19 2.8 12.6 C3 8.6 5.8 6 9 6.2 C11.4 6.4 13.2 8 14 10.4 C14.9 8 17 6.2 19.6 6.3 C23 6.5 25.2 9.4 24.9 12.9 C24.5 18.4 19.6 23 14 28 Z" />
        <path d="M30 26 C24.8 22.2 20.2 18.2 20.4 12.8 C20.6 9.4 23 7.2 25.8 7.4 C27.8 7.5 29.3 8.9 30 10.9 C30.8 8.9 32.6 7.4 34.8 7.5 C37.7 7.7 39.6 10.2 39.3 13.2 C38.9 17.8 34.7 21.8 30 26 Z" />
      </g>
    </svg>
  );
}

/** Logo: a glossy heart with a little outlined heart inside. */
export function LogoHeart({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 22" className={cn("block", className)} style={style} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="logo-heart" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF8FB8" />
          <stop offset="1" stopColor="#E94F87" />
        </linearGradient>
      </defs>
      <path d={HEART_24} fill="url(#logo-heart)" />
      <path
        d="M12 15.6 C9.4 13.8 7 11.8 7.1 9.3 C7.2 7.8 8.3 6.8 9.6 6.9 C10.7 7 11.5 7.7 12 8.8 C12.5 7.7 13.4 6.9 14.5 7 C15.9 7.1 16.9 8.3 16.8 9.7 C16.6 12 14.5 13.8 12 15.6 Z"
        fill="none"
        stroke="#fff"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The big satin bow from the top-right of the reference. */
export function BigBow({ className, style }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 210" className={cn("block", className)} style={style} aria-hidden="true" focusable="false">
      <g stroke="#F27BA8" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round">
        <path d="M95 80 C86 122 58 144 36 198 L56 192 L64 208 C82 156 104 124 105 86 Z" fill="#FFB3CF" />
        <path d="M106 82 C120 118 152 136 174 182 L154 180 L150 198 C132 150 108 126 99 88 Z" fill="#FFA3C5" />
        <path d="M100 72 C70 30 16 30 24 72 C30 104 76 98 100 80 Z" fill="#FFC2DA" />
        <path d="M100 72 C130 30 184 30 176 72 C170 104 124 98 100 80 Z" fill="#FFC2DA" />
        <path d="M98 74 C78 58 50 54 38 66 M102 74 C122 58 150 54 162 66" fill="none" opacity={0.55} />
        <rect x="87" y="62" width="26" height="26" rx="10" fill="#FF94BD" />
      </g>
      <path d="M40 52 C46 44 58 42 66 46 M134 46 C142 42 154 44 160 52" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" fill="none" opacity={0.7} />
    </svg>
  );
}

/** A long, low bank of cloud for things to "sit" on. */
export function CloudBank({ className, style, color = "#FFFFFF" }: DoodleProps & { color?: string }) {
  return (
    <svg viewBox="0 0 400 70" className={cn("block", className)} style={style} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path
        d="M0 70 V50 C8 34 34 28 52 40 C62 20 96 16 112 36 C126 16 164 14 178 36 C192 18 228 18 240 38 C254 22 290 22 302 42 C316 28 350 28 362 46 C376 38 394 42 400 50 V70 Z"
        fill={color}
      />
    </svg>
  );
}

/** Puffy cloud shape. */
export function Cloud({ className, style, color = "#FFFFFF" }: DoodleProps & { color?: string }) {
  return (
    <svg viewBox="0 0 200 90" className={cn("block", className)} style={style} aria-hidden="true" focusable="false">
      <path
        d="M30 84 C8 84 4 58 24 53 C20 30 50 20 66 36 C72 12 110 6 122 32 C134 16 166 20 166 46 C190 44 198 80 172 84 Z"
        fill={color}
      />
    </svg>
  );
}

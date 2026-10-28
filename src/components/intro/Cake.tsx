import type { CSSProperties } from "react";
import { HEART_PATH } from "@/components/cats/CatFigure";
import { LINE } from "@/components/cats/catPalettes";
import { cn } from "@/lib/utils";

const CANDLES = [60, 80, 100];
const SPRINKLES = [
  { d: "M50 76 l4 -3", c: "#B79BEA" },
  { d: "M64 82 l4 2", c: "#FFD66B" },
  { d: "M78 75 l3 4", c: "#7FD3C8" },
  { d: "M92 81 l4 -2", c: "#B79BEA" },
  { d: "M104 75 l3 3", c: "#FFD66B" },
  { d: "M112 83 l4 -3", c: "#7FD3C8" },
];

/** A two-tier birthday cake with flickering candles (decorative). */
export function Cake({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 160 150" className={cn("block h-auto w-full overflow-visible", className)} style={style} aria-hidden="true" focusable="false">
      {/* candles sit behind the top tier so they look pushed in */}
      {CANDLES.map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy={13} r={11} fill="#FFE08A" opacity={0.4} className="flame-glow" style={{ animationDelay: `${i * 0.3}s` }} />
          <rect x={cx - 3.5} y={26} width={7} height={30} rx={2.5} fill="#fff" stroke={LINE} strokeWidth={2} />
          <path d={`M${cx - 3.5} 33 l7 -4 M${cx - 3.5} 41 l7 -4 M${cx - 3.5} 49 l7 -4`} stroke="#FF8FB8" strokeWidth={2} />
          <path d={`M${cx} 26 v-3`} stroke={LINE} strokeWidth={1.6} strokeLinecap="round" />
          <g className="flame" style={{ transformOrigin: `${cx}px 23px`, animationDelay: `${i * 0.17}s` }}>
            <path d={`M${cx} 23 C${cx - 6} 17 ${cx - 5} 10 ${cx} 2 C${cx + 5} 10 ${cx + 6} 17 ${cx} 23 Z`} fill="#FFC94D" />
            <path d={`M${cx} 22 C${cx - 3} 18 ${cx - 2.5} 14 ${cx} 10 C${cx + 2.5} 14 ${cx + 3} 18 ${cx} 22 Z`} fill="#FF8A3D" />
          </g>
        </g>
      ))}

      <ellipse cx={80} cy={141} rx={72} ry={7} fill="#fff" stroke={LINE} strokeWidth={3} />

      {/* bottom tier */}
      <rect x={16} y={86} width={128} height={54} rx={14} fill="#FFB6D5" stroke={LINE} strokeWidth={3} />
      <path
        d="M17 100 C17 90 24 86 32 86 H128 C136 86 143 90 143 100 C143 106 137 108 134 103 C131 98 126 98 124 104 C122 112 114 112 112 104 C110 97 104 97 102 104 C100 111 92 111 90 104 C88 98 82 98 80 104 C78 112 70 112 68 104 C66 97 60 97 58 104 C56 110 48 110 47 103 C46 97 40 97 38 103 C36 109 28 110 26 104 C24 98 17 106 17 100 Z"
        fill="#FFF7EC"
        stroke={LINE}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {[36, 62, 98, 124].map((x) => (
        <path key={x} d={HEART_PATH} transform={`translate(${x} 124) scale(0.85)`} fill="#E94F87" />
      ))}
      {[49, 80, 111].map((x) => (
        <circle key={x} cx={x} cy={122} r={2.3} fill="#fff" />
      ))}

      {/* top tier */}
      <rect x={38} y={50} width={84} height={40} rx={12} fill="#FFF1E0" stroke={LINE} strokeWidth={3} />
      <path
        d="M39 62 C39 54 44 50 50 50 H110 C116 50 121 54 121 62 C121 67 116 69 114 65 C112 60 107 60 105 66 C103 72 96 72 95 66 C94 60 88 60 86 66 C84 72 77 72 76 66 C75 60 69 60 67 66 C65 71 58 71 57 65 C56 60 50 60 48 65 C46 70 39 68 39 62 Z"
        fill="#FF9EC4"
        stroke={LINE}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {SPRINKLES.map((s, i) => (
        <path key={i} d={s.d} stroke={s.c} strokeWidth={2.6} strokeLinecap="round" />
      ))}
    </svg>
  );
}

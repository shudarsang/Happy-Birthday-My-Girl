import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import {
  BLUSH,
  HEART,
  LINE,
  catPalettes,
  defaultAccessory,
  type CatAccessory,
  type CatEyes,
  type CatPalette,
  type CatPose,
  type CatVariant,
} from "./catPalettes";

/**
 * Hand-built SVG kittens. Every moving part (ears, eyes, tail, legs, paw…)
 * is its own group with a class name, so the CSS in globals.css can animate
 * it independently and the drawings stay crisp at any size.
 */

const SW = 3;
export const HEART_PATH =
  "M0 4.2 C-1.2 3.2 -6 0 -6 -3.4 C-6 -5.6 -4.4 -7 -2.7 -7 C-1.4 -7 -0.5 -6.2 0 -5.2 C0.5 -6.2 1.4 -7 2.7 -7 C4.4 -7 6 -5.6 6 -3.4 C6 0 1.2 3.2 0 4.2 Z";

const origin = (x: number, y: number): CSSProperties => ({ transformOrigin: `${x}px ${y}px` });

/** An outlined "tube" — used for tails and legs. */
function Tube({ d, color, width, stripes }: { d: string; color: string; width: number; stripes?: string }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={LINE} strokeWidth={width + 3.6} />
      <path d={d} stroke={color} strokeWidth={width} />
      {stripes && <path d={d} stroke={stripes} strokeWidth={width} strokeDasharray="2.5 6" />}
    </g>
  );
}

function Paw({ cx, cy, fill, rx = 8.5, ry = 5.5 }: { cx: number; cy: number; fill: string; rx?: number; ry?: number }) {
  return (
    <>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={fill} stroke={LINE} strokeWidth={SW * 0.85} />
      <path
        d={`M${cx - 2.6} ${cy - 1.4} v2.4 M${cx + 2.6} ${cy - 1.4} v2.4`}
        stroke={LINE}
        strokeWidth={1.4}
        strokeLinecap="round"
        opacity={0.5}
      />
    </>
  );
}

export function HeartShape({ x, y, scale = 1, className }: { x: number; y: number; scale?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className={className}>
        <path d={HEART_PATH} fill={HEART} stroke={LINE} strokeWidth={1.8 / scale} strokeLinejoin="round" />
        <path d="M-3.8 -4.4 Q-4.7 -3 -4.1 -1.6" stroke="#fff" strokeWidth={1.3 / scale} strokeLinecap="round" fill="none" opacity={0.85} />
      </g>
    </g>
  );
}

function Bow({ x, y, rotate = 0, p }: { x: number; y: number; rotate?: number; p: CatPalette }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} strokeLinejoin="round">
      <path d="M0 0 L-10 -7 Q-13.5 0 -10 7 Z" fill={p.accent} stroke={LINE} strokeWidth={2} />
      <path d="M0 0 L10 -7 Q13.5 0 10 7 Z" fill={p.accent} stroke={LINE} strokeWidth={2} />
      <path d="M-8.4 -3.2 L-5 -1.4 M8.4 -3.2 L5 -1.4" stroke="#fff" strokeWidth={1.4} strokeLinecap="round" opacity={0.7} />
      <circle r={3.2} fill={p.accentDark} stroke={LINE} strokeWidth={1.8} />
    </g>
  );
}

function Flower({ x, y, p }: { x: number; y: number; p: CatPalette }) {
  const petals = [0, 72, 144, 216, 288].map((deg) => {
    const r = (deg * Math.PI) / 180;
    return { cx: +(Math.cos(r) * 4.4).toFixed(2), cy: +(Math.sin(r) * 4.4).toFixed(2) };
  });
  const petal = p.accent === "#FFFFFF" ? "#FFFFFF" : p.accent;
  return (
    <g transform={`translate(${x} ${y})`}>
      {petals.map((pt, i) => (
        <circle key={i} cx={pt.cx} cy={pt.cy} r={3.8} fill={petal} stroke="#F07AA8" strokeWidth={1.4} />
      ))}
      <circle r={2.7} fill="#FFD66B" stroke="#F0A93C" strokeWidth={1.2} />
    </g>
  );
}

function NeckRibbon({ x, y, p }: { x: number; y: number; p: CatPalette }) {
  return (
    <g transform={`translate(${x} ${y})`} strokeLinejoin="round" stroke={LINE} strokeWidth={1.8}>
      <path d="M-1.5 2 L-6.5 13 L-2.6 11.6 L-1 14.4 Z" fill={p.accent} />
      <path d="M1.5 2 L6.5 13 L2.6 11.6 L1 14.4 Z" fill={p.accent} />
      <path d="M0 0 L-9 -6 Q-12 0 -9 6 Z" fill={p.accent} />
      <path d="M0 0 L9 -6 Q12 0 9 6 Z" fill={p.accent} />
      <circle r={2.8} fill={p.accentDark} />
    </g>
  );
}

/* ───────────────────────── Front-facing head (sit / peek) ───────────────────────── */

function FrontHead({ p, eyes, accessory, dy = 0 }: { p: CatPalette; eyes: CatEyes; accessory: CatAccessory; dy?: number }) {
  const lidColor = p.eyeRing ?? LINE;
  return (
    <g transform={dy ? `translate(0 ${dy})` : undefined}>
      <g className="cat-head" style={origin(60, 80)}>
        <g className="cat-ear-l" style={origin(46, 40)}>
          <path d="M36 50 L30.5 18 Q30 13.5 34.5 15 L57 33 Z" fill={p.fur} stroke={LINE} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M38.5 41 L35.5 22.5 L49.5 33.5 Z" fill={p.earInner} />
        </g>
        <g className="cat-ear-r" style={origin(74, 40)}>
          <path d="M84 50 L89.5 18 Q90 13.5 85.5 15 L63 33 Z" fill={p.fur} stroke={LINE} strokeWidth={SW} strokeLinejoin="round" />
          <path d="M81.5 41 L84.5 22.5 L70.5 33.5 Z" fill={p.earInner} />
        </g>
        {p.fluffy && (
          <path
            d="M33 53 L23 59 L30 62 L24 68.5 L34 70 Z M87 53 L97 59 L90 62 L96 68.5 L86 70 Z"
            fill={p.fur}
            stroke={LINE}
            strokeWidth={SW}
            strokeLinejoin="round"
          />
        )}
        <ellipse cx="60" cy="56" rx="31" ry="25.5" fill={p.fur} stroke={LINE} strokeWidth={SW} />
        {p.patch && <ellipse cx="60" cy="70.5" rx="15.5" ry="9" fill={p.patch} />}
        {p.stripes && (
          <path d="M53 33.5 l1.5 6 M60 31.8 v7 M67 33.5 l-1.5 6" stroke={p.stripes} strokeWidth={3} strokeLinecap="round" />
        )}

        {eyes === "open" ? (
          <g className="cat-eyes" style={origin(60, 58)}>
            {p.eyeRing && (
              <>
                <circle cx="47" cy="58" r="5.8" fill={p.eyeRing} />
                <circle cx="73" cy="58" r="5.8" fill={p.eyeRing} />
              </>
            )}
            <ellipse cx="47" cy="58" rx="3.7" ry="4.6" fill={p.eye} />
            <ellipse cx="73" cy="58" rx="3.7" ry="4.6" fill={p.eye} />
            <circle cx="48.5" cy="56.2" r="1.45" fill="#fff" />
            <circle cx="74.5" cy="56.2" r="1.45" fill="#fff" />
          </g>
        ) : (
          <path
            d={
              eyes === "happy"
                ? "M42.5 59.5 Q47 53.5 51.5 59.5 M68.5 59.5 Q73 53.5 77.5 59.5"
                : "M42.5 57 Q47 62 51.5 57 M68.5 57 Q73 62 77.5 57"
            }
            stroke={lidColor}
            strokeWidth={2.6}
            strokeLinecap="round"
            fill="none"
          />
        )}

        <path d="M57.4 64.4 Q60 63.4 62.6 64.4 L60 67.4 Z" fill="#F27BA8" stroke="#F27BA8" strokeWidth={1.2} strokeLinejoin="round" />
        <path
          d="M60 67.4 v1.4 M55.6 68.8 Q57.8 71.8 60 69 Q62.2 71.8 64.4 68.8"
          stroke={LINE}
          strokeWidth={2}
          strokeLinecap="round"
          fill="none"
        />
        <ellipse cx="40" cy="66" rx="5.2" ry="3.2" fill={BLUSH} opacity={0.75} />
        <ellipse cx="80" cy="66" rx="5.2" ry="3.2" fill={BLUSH} opacity={0.75} />
        <path
          d="M29.5 62 L21 60.5 M30 66.5 L22 68.5 M90.5 62 L99 60.5 M90 66.5 L98 68.5"
          stroke={LINE}
          strokeWidth={1.6}
          strokeLinecap="round"
          opacity={0.45}
        />

        {accessory === "bow" && <Bow x={80} y={33} rotate={20} p={p} />}
        {accessory === "flower" && <Flower x={80} y={33} p={p} />}
      </g>
    </g>
  );
}

/* ───────────────────────── Side head (run) ───────────────────────── */

function SideHead({ p, eyes, accessory }: { p: CatPalette; eyes: CatEyes; accessory: CatAccessory }) {
  const lidColor = p.eyeRing ?? LINE;
  return (
    <g className="cat-head" style={origin(100, 58)}>
      <g className="cat-ear-l" style={origin(96, 28)}>
        <path d="M89 36 L86.5 12 Q86.5 8 90.5 9.5 L106 23 Z" fill={p.fur} stroke={LINE} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M91.5 30 L90 16 L101 24.5 Z" fill={p.earInner} />
      </g>
      <g className="cat-ear-r" style={origin(120, 28)}>
        <path d="M127 36 L131.5 12 Q132 8 128 9.5 L111 23 Z" fill={p.fur} stroke={LINE} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M124.5 30 L128 16 L115.5 24.5 Z" fill={p.earInner} />
      </g>
      {p.fluffy && (
        <path d="M87 38 L78 42 L85 45.5 L79 51.5 L89 51 Z" fill={p.fur} stroke={LINE} strokeWidth={SW} strokeLinejoin="round" />
      )}
      <ellipse cx="108" cy="40" rx="23.5" ry="20" fill={p.fur} stroke={LINE} strokeWidth={SW} />
      {p.patch && <ellipse cx="113" cy="52.5" rx="12.5" ry="7" fill={p.patch} />}
      {p.stripes && (
        <path d="M103 23.5 l1 5.5 M109 22.4 v6 M115 23.5 l-1 5.5" stroke={p.stripes} strokeWidth={2.8} strokeLinecap="round" />
      )}

      {eyes === "open" ? (
        <g className="cat-eyes" style={origin(112, 41)}>
          {p.eyeRing && (
            <>
              <circle cx="104" cy="41" r="5.4" fill={p.eyeRing} />
              <circle cx="121" cy="41" r="5.4" fill={p.eyeRing} />
            </>
          )}
          <ellipse cx="104" cy="41" rx="3.4" ry="4.3" fill={p.eye} />
          <ellipse cx="121" cy="41" rx="3.4" ry="4.3" fill={p.eye} />
          <circle cx="105.4" cy="39.3" r="1.3" fill="#fff" />
          <circle cx="122.4" cy="39.3" r="1.3" fill="#fff" />
        </g>
      ) : (
        <path
          d={eyes === "happy" ? "M100 42 Q104 36.5 108 42 M117 42 Q121 36.5 125 42" : "M100 40 Q104 45 108 40 M117 40 Q121 45 125 40"}
          stroke={lidColor}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
        />
      )}

      <path d="M111.2 46.6 Q113.5 45.6 115.8 46.6 L113.5 49.4 Z" fill="#F27BA8" stroke="#F27BA8" strokeWidth={1.1} strokeLinejoin="round" />
      <path
        d="M113.5 49.4 v1.3 M109.6 50.8 Q111.6 53.6 113.5 51 Q115.4 53.6 117.4 50.8"
        stroke={LINE}
        strokeWidth={1.9}
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="97.5" cy="48.5" rx="4.6" ry="2.8" fill={BLUSH} opacity={0.75} />
      <ellipse cx="127.5" cy="48.5" rx="3.4" ry="2.6" fill={BLUSH} opacity={0.75} />
      <path d="M131 45.5 l7.5 -1.8 M131 49.5 l7.5 1.6" stroke={LINE} strokeWidth={1.5} strokeLinecap="round" opacity={0.45} />

      {accessory === "bow" && <Bow x={93} y={23} rotate={-25} p={p} />}
      {accessory === "flower" && <Flower x={93} y={24} p={p} />}
    </g>
  );
}

/* ───────────────────────── Poses ───────────────────────── */

interface PoseProps {
  p: CatPalette;
  eyes: CatEyes;
  accessory: CatAccessory;
  wave: boolean;
  heartVisible: boolean;
}

function SitPose({ p, eyes, accessory, wave, heartVisible }: PoseProps) {
  const paw = p.paws ?? p.fur;
  return (
    <>
      <g className="cat-tail" style={origin(80, 118)}>
        <Tube d="M80 118 C100 121 109 106 104 90 C102 83 97 80 93 82" color={p.fur} width={p.fluffy ? 10 : 7} stripes={p.stripes} />
      </g>
      <path
        d="M37 116 C35 94 44 78 60 78 C76 78 85 94 83 116 C82.5 121.5 79 124 73 124 L47 124 C41 124 37.5 121.5 37 116 Z"
        fill={p.fur}
        stroke={LINE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      {p.patch && <ellipse cx="60" cy="103" rx="12.5" ry="15" fill={p.patch} />}
      {p.stripes && (
        <path
          d="M39.5 99 q5 -1.5 8 2 M38.8 107 q5 -1.5 8 2 M80.5 99 q-5 -1.5 -8 2 M81.2 107 q-5 -1.5 -8 2"
          stroke={p.stripes}
          strokeWidth={2.6}
          strokeLinecap="round"
          fill="none"
        />
      )}
      <Paw cx={49} cy={122} fill={paw} />
      {!wave && <Paw cx={71} cy={122} fill={paw} />}
      {accessory === "heart" && (
        <>
          <HeartShape x={60} y={106} scale={1.45} className={cn("cat-held-heart", !heartVisible && "is-dropped")} />
          <Paw cx={50.5} cy={104} fill={paw} rx={5.6} ry={4.6} />
          <Paw cx={69.5} cy={104} fill={paw} rx={5.6} ry={4.6} />
        </>
      )}
      {wave && (
        <g className="cat-wave" style={origin(73, 100)}>
          <Tube d="M73 100 L88 86" color={p.fur} width={8} />
          <Paw cx={89.5} cy={84.5} fill={paw} rx={6.2} ry={6} />
        </g>
      )}
      <FrontHead p={p} eyes={eyes} accessory={accessory} />
      {accessory === "ribbon" && <NeckRibbon x={60} y={83} p={p} />}
    </>
  );
}

function PeekPose({ p, eyes, accessory }: PoseProps) {
  const paw = p.paws ?? p.fur;
  return (
    <>
      <FrontHead p={p} eyes={eyes} accessory={accessory} dy={-6} />
      <Paw cx={42} cy={79} fill={paw} rx={10} ry={6.5} />
      <Paw cx={78} cy={79} fill={paw} rx={10} ry={6.5} />
    </>
  );
}

function RunPose({ p, eyes, accessory, heartVisible }: PoseProps) {
  const legW = 7.5;
  const sock = p.paws ?? p.fur;
  return (
    <g className="cat-run-bounce" style={origin(75, 92)}>
      <g className="cat-tail" style={origin(38, 50)}>
        <Tube d="M38 50 C25 48 15 38 17 25 C18 19 22 17 26 19" color={p.fur} width={p.fluffy ? 10 : 7} stripes={p.stripes} />
      </g>
      {/* far legs (shaded), then near legs — all tucked behind the body */}
      <g className="cat-leg-bf" style={origin(52, 62)}>
        <Tube d="M52 62 L50 85" color={p.shade} width={legW} />
      </g>
      <g className="cat-leg-ff" style={origin(90, 62)}>
        <Tube d="M90 62 L92 85" color={p.shade} width={legW} />
      </g>
      <g className="cat-leg-bn" style={origin(46, 64)}>
        <Tube d="M46 64 L43 87" color={sock} width={legW} />
      </g>
      <g className="cat-leg-fn" style={origin(86, 64)}>
        <Tube d="M86 64 L89 87" color={sock} width={legW} />
      </g>
      <ellipse cx="68" cy="55" rx="31" ry="17.5" fill={p.fur} stroke={LINE} strokeWidth={SW} />
      {p.patch && <ellipse cx="74" cy="63" rx="17" ry="6.8" fill={p.patch} />}
      {p.stripes && (
        <path
          d="M57 39.5 q2.5 5 0 10 M67 38 q2.5 5 0 10 M77 39.5 q2.5 5 0 9"
          stroke={p.stripes}
          strokeWidth={2.6}
          strokeLinecap="round"
          fill="none"
        />
      )}
      <SideHead p={p} eyes={eyes} accessory={accessory} />
      {accessory === "ribbon" && (
        <>
          <g className="cat-ribbon-tail" style={origin(91, 58)}>
            <path d="M90 58 C83 61 79 56 70 60" stroke={LINE} strokeWidth={6} strokeLinecap="round" fill="none" />
            <path d="M90 58 C83 61 79 56 70 60" stroke={p.accent} strokeWidth={3} strokeLinecap="round" fill="none" />
          </g>
          <g strokeLinejoin="round" stroke={LINE} strokeWidth={1.8}>
            <path d="M92 57 L84.5 52 Q82 57.5 85 62.5 Z" fill={p.accent} />
            <path d="M92 57 L99.5 52 Q102 57.5 99 62.5 Z" fill={p.accent} />
            <circle cx="92" cy="57" r="2.7" fill={p.accentDark} />
          </g>
        </>
      )}
      {accessory === "heart" && (
        <HeartShape x={128} y={63} scale={1.25} className={cn("cat-held-heart", !heartVisible && "is-dropped")} />
      )}
    </g>
  );
}

function SleepPose({ p, eyes, accessory }: PoseProps) {
  const lidColor = p.eyeRing ?? LINE;
  return (
    <g className="cat-breathe" style={origin(70, 88)}>
      <path
        d="M20 72 C18 48 42 34 74 34 C104 34 124 48 122 70 C121.5 78 116 83 108 83 L32 83 C25 83 20 79 20 72 Z"
        fill={p.fur}
        stroke={LINE}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      {p.stripes && (
        <path
          d="M80 36.5 q-1.5 6 1.5 10 M92 38.5 q-1.5 6 1.5 10 M103 43 q-1.5 5 1.5 9"
          stroke={p.stripes}
          strokeWidth={2.6}
          strokeLinecap="round"
          fill="none"
        />
      )}
      <g className="cat-tail-sleep" style={origin(117, 76)}>
        <Tube d="M117 76 C121 88 98 89 72 88.5 C60 88.3 52 88 46 86.5" color={p.fur} width={p.fluffy ? 9 : 7} stripes={p.stripes} />
      </g>

      <g className="cat-ear-l" style={origin(32, 44)}>
        <path d="M25 54 L20 29 Q19.8 25 23.8 26.4 L41 39.5 Z" fill={p.fur} stroke={LINE} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M27.5 47.5 L24.5 32 L36 41 Z" fill={p.earInner} />
      </g>
      <g className="cat-ear-r" style={origin(60, 44)}>
        <path d="M67 54 L72 29 Q72.2 25 68.2 26.4 L51 39.5 Z" fill={p.fur} stroke={LINE} strokeWidth={SW} strokeLinejoin="round" />
        <path d="M64.5 47.5 L67.5 32 L56 41 Z" fill={p.earInner} />
      </g>
      <ellipse cx="46" cy="60" rx="27" ry="22" fill={p.fur} stroke={LINE} strokeWidth={SW} />
      {p.patch && <ellipse cx="46" cy="72" rx="13" ry="8" fill={p.patch} />}
      {p.stripes && <path d="M40 41 l1 5 M46 39.6 v5.6 M52 41 l-1 5" stroke={p.stripes} strokeWidth={2.8} strokeLinecap="round" />}
      {eyes === "open" ? (
        <g className="cat-eyes" style={origin(46, 61)}>
          {p.eyeRing && (
            <>
              <circle cx="36.5" cy="61" r="5" fill={p.eyeRing} />
              <circle cx="55.5" cy="61" r="5" fill={p.eyeRing} />
            </>
          )}
          <ellipse cx="36.5" cy="61" rx="3.2" ry="4" fill={p.eye} />
          <ellipse cx="55.5" cy="61" rx="3.2" ry="4" fill={p.eye} />
          <circle cx="37.8" cy="59.4" r="1.2" fill="#fff" />
          <circle cx="56.8" cy="59.4" r="1.2" fill="#fff" />
        </g>
      ) : (
        <path
          d={eyes === "happy" ? "M32.5 62.5 Q36.5 57 40.5 62.5 M51.5 62.5 Q55.5 57 59.5 62.5" : "M32.5 61 Q36.5 65 40.5 61 M51.5 61 Q55.5 65 59.5 61"}
          stroke={lidColor}
          strokeWidth={2.4}
          strokeLinecap="round"
          fill="none"
        />
      )}
      <path d="M43.8 67 Q46 66 48.2 67 L46 69.6 Z" fill="#F27BA8" stroke="#F27BA8" strokeWidth={1.1} strokeLinejoin="round" />
      <path d="M46 69.6 v1.2 M42.6 71 Q44.3 73.4 46 71.2 Q47.7 73.4 49.4 71" stroke={LINE} strokeWidth={1.8} strokeLinecap="round" fill="none" />
      <ellipse cx="29.5" cy="68.5" rx="4.6" ry="2.8" fill={BLUSH} opacity={0.75} />
      <ellipse cx="62.5" cy="68.5" rx="4.6" ry="2.8" fill={BLUSH} opacity={0.75} />
      <path d="M19.5 64 L12 62.5 M20 68.5 L13 70.5" stroke={LINE} strokeWidth={1.5} strokeLinecap="round" opacity={0.45} />
      <Paw cx={73} cy={82} fill={p.paws ?? p.fur} rx={9} ry={5} />

      {accessory === "bow" && <Bow x={63} y={40} rotate={22} p={p} />}
      {accessory === "flower" && <Flower x={63} y={40} p={p} />}
      {accessory === "heart" && <HeartShape x={90} y={77} scale={1.2} />}
    </g>
  );
}

const viewBoxes: Record<CatPose, string> = {
  sit: "0 0 120 128",
  peek: "0 0 120 86",
  run: "0 0 150 100",
  sleep: "0 0 140 96",
};

export interface CatFigureProps {
  variant?: CatVariant;
  pose?: CatPose;
  /** Omit to use the variant's signature accessory. */
  accessory?: CatAccessory;
  eyes?: CatEyes;
  /** Sitting cats only: raise a paw and wave. */
  wave?: boolean;
  /** Heart-carrying cats hide their heart while it floats away. */
  heartVisible?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function CatFigure({
  variant = "white",
  pose = "sit",
  accessory,
  eyes = "open",
  wave = false,
  heartVisible = true,
  className,
  style,
}: CatFigureProps) {
  const p = catPalettes[variant];
  const props: PoseProps = { p, eyes, accessory: accessory ?? defaultAccessory[variant], wave, heartVisible };

  return (
    <svg
      viewBox={viewBoxes[pose]}
      className={cn("cat-svg block h-auto w-full overflow-visible", className)}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {pose === "sit" && <SitPose {...props} />}
      {pose === "peek" && <PeekPose {...props} />}
      {pose === "run" && <RunPose {...props} />}
      {pose === "sleep" && <SleepPose {...props} />}
    </svg>
  );
}

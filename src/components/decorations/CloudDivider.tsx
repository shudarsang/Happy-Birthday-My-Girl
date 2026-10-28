import { cn } from "@/lib/utils";

/** Soft, puffy cloud edge used between sections. `fill` is the next section's colour. */
export function CloudDivider({ fill, className, flip = false }: { fill: string; className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn("pointer-events-none block h-[56px] w-full sm:h-[80px] lg:h-[100px]", flip && "rotate-180", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 74 C70 40 150 36 214 62 C262 26 352 22 410 56 C470 30 560 30 612 62 C672 26 770 24 828 58 C890 30 990 32 1040 64 C1100 30 1200 28 1256 60 C1310 36 1390 40 1440 66 V120 H0 Z"
        fill={fill}
        opacity={0.55}
      />
      <path
        d="M0 92 C80 62 168 60 230 84 C290 56 380 54 440 82 C500 58 590 58 650 86 C716 56 808 56 868 84 C930 58 1020 58 1082 86 C1146 56 1236 58 1296 84 C1350 64 1408 66 1440 80 V120 H0 Z"
        fill={fill}
      />
    </svg>
  );
}

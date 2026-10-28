export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Adds `relative` unless the caller already positioned the element. */
export function positioned(className?: string) {
  return /(^|\s)(absolute|fixed|relative|sticky)(\s|$)/.test(className ?? "") ? className : cn("relative", className);
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

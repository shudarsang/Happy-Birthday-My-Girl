export type CatVariant = "white" | "cream" | "gray" | "orange" | "tuxedo" | "sakura";
export type CatAccessory = "none" | "bow" | "ribbon" | "heart" | "flower";
export type CatPose = "sit" | "run" | "sleep" | "peek";
export type CatEyes = "open" | "happy" | "closed";

export interface CatPalette {
  fur: string;
  /** Far legs / shading. */
  shade: string;
  /** Muzzle, chest and belly patch. */
  patch?: string;
  earInner: string;
  stripes?: string;
  eye: string;
  /** Light ring behind the eyes — keeps them readable on dark fur. */
  eyeRing?: string;
  /** Sock colour (defaults to fur). */
  paws?: string;
  /** Fluffier tail and cheek tufts. */
  fluffy?: boolean;
  /** Colour used for the bow / ribbon. */
  accent: string;
  accentDark: string;
}

/** Accessory each cat wears unless told otherwise — keeps them recognisable. */
export const defaultAccessory: Record<CatVariant, CatAccessory> = {
  white: "bow",
  cream: "heart",
  gray: "ribbon",
  orange: "none",
  tuxedo: "bow",
  sakura: "flower",
};

export const LINE = "#481A35";
export const BLUSH = "#FF9EC4";
export const HEART = "#FF5F99";

export const catPalettes: Record<CatVariant, CatPalette> = {
  white: {
    fur: "#FFFFFF",
    shade: "#EFE2EA",
    earInner: "#FFC2DA",
    eye: "#3A1A2C",
    accent: "#FF84B4",
    accentDark: "#E94F87",
  },
  cream: {
    fur: "#FFEFD0",
    shade: "#F1D5A6",
    patch: "#FFFBF1",
    earInner: "#FFBFCB",
    eye: "#3A1A2C",
    accent: "#FF84B4",
    accentDark: "#E94F87",
  },
  gray: {
    fur: "#D9D3E4",
    shade: "#B8AFC9",
    patch: "#F6F3FA",
    earInner: "#FFC2DA",
    stripes: "#ADA2C0",
    eye: "#3A1A2C",
    accent: "#BFA3F0",
    accentDark: "#8F6BD6",
  },
  orange: {
    fur: "#FFC489",
    shade: "#EFA25C",
    patch: "#FFF1E0",
    earInner: "#FFB3C1",
    stripes: "#EC9550",
    eye: "#3A1A2C",
    fluffy: true,
    accent: "#FF84B4",
    accentDark: "#E94F87",
  },
  tuxedo: {
    fur: "#4F3E50",
    shade: "#3A2C3B",
    patch: "#FFFFFF",
    earInner: "#F5A3C4",
    eye: "#2A1420",
    eyeRing: "#FFF3C4",
    paws: "#FFFFFF",
    accent: "#FF8FB8",
    accentDark: "#E94F87",
  },
  sakura: {
    fur: "#FFDCEA",
    shade: "#F6BED4",
    patch: "#FFF6FA",
    earInner: "#FF9EC4",
    eye: "#3A1A2C",
    accent: "#FFFFFF",
    accentDark: "#FFD66B",
  },
};

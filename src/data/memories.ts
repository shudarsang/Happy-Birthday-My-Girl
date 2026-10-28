import { photo } from "./photos";

/**
 * ♡ Our Little World ♡
 *
 * Each memory card has a photo, a title, an optional date and a caption.
 * Put photos in /public/photos/ and point `photo.src` at them with photo("…").
 * Leave `date` as an empty string to hide it. `photo.focus` works like in
 * photos.ts (which part of the picture stays visible in the 4:3 frame).
 */
export interface Memory {
  title: string;
  /** Free text, e.g. "14 February 2025" — or "" to hide the date. */
  date: string;
  caption: string;
  photo: { src: string; alt: string; focus?: string };
}

export const memories: Memory[] = [
  {
    title: "Our First Memory",
    date: "",
    caption: "Where our little story began — the very first page of my favorite book.",
    photo: {
      src: photo("WhatsApp Image 2026-10-28 at 11.23.04 PM (2).jpeg"),
      alt: "The two of us smiling cheek to cheek in a close selfie, trees behind us",
    },
  },
  {
    title: "My Favorite Day",
    date: "",
    caption: "Every day with you is a good one, but this one holds a special place in my heart.",
    photo: {
      src: photo("WhatsApp Image 2026-10-28 at 11.23.04 PM.jpeg"),
      alt: "Me looking at you while you smile, outdoors in the shade of the trees",
    },
  },
  {
    title: "Little Things, Big Feelings",
    date: "",
    caption: "Your laugh, your smile, the way you look at me — the tiny things mean everything.",
    photo: {
      // The picture sits in the middle of this image; the centred crop hides the bars.
      src: photo("WhatsApp Image 2026-10-28 at 11.23.05 PM (1).jpeg"),
      alt: "Us sitting close together, my head leaning towards yours",
    },
  },
  {
    title: "Every Moment With You",
    date: "",
    caption: "Every moment with you is a memory I want to keep forever. ♡",
    photo: {
      src: photo("WhatsApp Image 2026-10-28 at 11.39.55 PM.jpeg"),
      alt: "Us kissing, photographed from inside a little hole in the sand with the sky behind",
      focus: "50% 38%",
    },
  },
];

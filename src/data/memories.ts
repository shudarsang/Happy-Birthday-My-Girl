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
      src: photo("WhatsApp Image 2026-10-28 at 11.39.53 PM (2).jpeg"),
      alt: "Us in front of a painted wall with flowers, you in a red top and me in a plaid shirt",
    },
  },
  {
    title: "My Favorite Day",
    date: "",
    caption: "Every day with you is a good one, but this one holds a special place in my heart.",
    photo: {
      src: photo("WhatsApp Image 2026-10-28 at 11.39.52 PM.jpeg"),
      alt: "Selfie of us under tall green trees on a bright day",
    },
  },
  {
    title: "Little Things, Big Feelings",
    date: "",
    caption: "Your laugh, your smile, the way you look at me — the tiny things mean everything.",
    photo: {
      src: photo("WhatsApp Image 2026-10-28 at 11.23.03 PM.jpeg"),
      alt: "You making a playful kissy face while I look at you, outdoors",
    },
  },
  {
    title: "Every Moment With You",
    date: "",
    caption: "Every moment with you is a memory I want to keep forever. ♡",
    photo: {
      src: photo("WhatsApp Image 2026-10-28 at 11.39.54 PM (1).jpeg"),
      alt: "Us smiling together in a selfie indoors, you in a floral top",
    },
  },
];

/**
 * ♡ Our Gallery ♡
 *
 * To add or change photos:
 *   1. Copy pictures into  /public/photos/
 *   2. Add an entry below with `src: photo("<file name>")`
 *   3. Describe the picture in `alt` (read aloud by screen readers)
 *   4. Optionally change the handwritten `caption`
 *   5. Optionally set `focus` (CSS object-position, e.g. "50% 25%") to choose
 *      which part of a tall/wide photo stays visible in the square frame.
 *
 * The order here is the order on the page; the first few are shown until
 * "View More Photos" is pressed (see `gallery.initialCount` in siteConfig.ts).
 * The lightbox always shows the whole, uncropped picture.
 */
export interface Photo {
  src: string;
  alt: string;
  caption?: string;
  focus?: string;
}

/** Builds a URL for a file in /public/photos (spaces and brackets are fine). */
export const photo = (fileName: string) => `/photos/${fileName}`;

export const photos: Photo[] = [
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.23.04 PM (3).jpeg"),
    alt: "A close selfie of us smiling, me in a maroon T-shirt",
    caption: "You & me ♡",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.53 PM (4).jpeg"),
    alt: "You in a yellow top and me in a plaid shirt, leaning close together for a selfie",
    caption: "My favorite view",
    focus: "50% 25%",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.23.03 PM.jpeg"),
    alt: "You making a playful kissy face while I look at you, outdoors",
    caption: "Kissy face ♡",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.30.11 PM.jpeg"),
    alt: "You leaning over me in a cozy selfie, both of us smiling softly",
    caption: "Cuddle mode",
    focus: "50% 35%",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.52 PM.jpeg"),
    alt: "Selfie of us under tall green trees on a bright day",
    caption: "Under the trees",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.23.04 PM (1).jpeg"),
    alt: "Selfie of us outdoors among green trees, you in glasses and a cream outfit",
    caption: "Selfie with my love",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.23.05 PM (2).jpeg"),
    alt: "You standing in a green field wearing a leopard-print scarf, smiling",
    caption: "My beautiful girl",
    focus: "50% 30%",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.53 PM (2).jpeg"),
    alt: "Us in front of a painted wall with flowers, you in a red top and me in a plaid shirt",
    caption: "Flower wall ♡",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.53 PM (3).jpeg"),
    alt: "A tilted selfie of us in front of a colorful fruit mural",
    caption: "Colorful days",
    focus: "50% 45%",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.53 PM.jpeg"),
    alt: "Us taking a selfie in front of a giant poster of a child pulling a funny face",
    caption: "Photobombed! ♡",
    focus: "50% 45%",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.53 PM (1).jpeg"),
    alt: "Us in a selfie with sparkly flower-crown filters",
    caption: "Flower crowns ♡",
    focus: "50% 35%",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.54 PM (1).jpeg"),
    alt: "Us smiling together in a selfie indoors, you in a floral top",
    caption: "Smiles all day",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.54 PM.jpeg"),
    alt: "Us smiling in a hallway selfie, you in a floral top and me in a pink T-shirt",
    caption: "Just us",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.23.06 PM.jpeg"),
    alt: "You smiling in the field in your leopard-print scarf",
    caption: "Pretty as always",
    focus: "50% 30%",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.54 PM (2).jpeg"),
    alt: "A video call between us on a laptop screen",
    caption: "Even through a screen ♡",
    focus: "50% 30%",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.54 PM (3).jpeg"),
    alt: "A mirror selfie of us, me holding a red phone and standing behind you",
    caption: "Mirror, mirror ♡",
    focus: "50% 40%",
  },
];

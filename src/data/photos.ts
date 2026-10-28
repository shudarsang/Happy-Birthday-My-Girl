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
    src: photo("WhatsApp Image 2026-10-28 at 11.23.04 PM (2).jpeg"),
    alt: "The two of us smiling cheek to cheek in a close selfie, trees behind us",
    caption: "Matching smiles ♡",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.55 PM.jpeg"),
    alt: "Us kissing, photographed from inside a little hole in the sand with the sky behind",
    caption: "Sweetest kiss ♡",
    focus: "50% 40%",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.39.53 PM (4).jpeg"),
    alt: "You in a yellow top and me in a plaid shirt, leaning close together for a selfie",
    caption: "My favorite view",
    focus: "50% 25%",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.30.11 PM.jpeg"),
    alt: "You leaning over me in a cozy selfie, both of us smiling softly",
    caption: "Cuddle mode",
    focus: "50% 35%",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.23.04 PM (1).jpeg"),
    alt: "Selfie of us outdoors among green trees, you in glasses and a cream outfit",
    caption: "Selfie with my love",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.23.04 PM (3).jpeg"),
    alt: "Another close selfie of us smiling, me in a maroon T-shirt",
    caption: "You & me ♡",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.23.04 PM.jpeg"),
    alt: "Me looking at you while you smile, outdoors in the shade of the trees",
    caption: "That look ♡",
  },
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.23.05 PM (2).jpeg"),
    alt: "You standing in a green field wearing a leopard-print scarf, smiling",
    caption: "My beautiful girl",
    focus: "50% 30%",
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
  {
    src: photo("WhatsApp Image 2026-10-28 at 11.23.05 PM (1).jpeg"),
    alt: "Us sitting close together, my head leaning towards yours",
    caption: "Side by side",
    focus: "50% 45%",
  },
];

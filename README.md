# Happy Birthday, My Love ♡

A little birthday website: Next.js 16 + React 19, Tailwind CSS 4, Motion and
Lucide icons. All the cats are hand-drawn SVG.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

To share it, the easiest host is Vercel: push the folder to GitHub and import
it at vercel.com (no settings needed). The page asks search engines not to index it.

## Make it yours

Everything personal is in `src/data/`:

| What | Where |
| --- | --- |
| Birthday date & time (countdown target), all headings, the letter, the surprise, footer lines, what the cats say | `src/data/siteConfig.ts` |
| Gallery photos, captions, alt text | `src/data/photos.ts` |
| "Our Little World" memory cards (photo, title, date, caption) | `src/data/memories.ts` |
| Hero illustration | `public/images/couple.png` (path set in `siteConfig.ts`) |

Any `♡` you type in these files is drawn as a little pink heart.

### Opening greeting

When the site opens, a full-screen "Happy Birthday / Dee Puchaa" animation plays
(letters, confetti, a cake with candles, two kittens). Change its words, button
text or the auto-continue time under `intro` in `siteConfig.ts`. The animation
lives in `src/components/intro/`.

### Photos

1. Put pictures in `public/photos/`.
2. Add an entry in `src/data/photos.ts`: `src: photo("my-picture.jpg")`, plus `alt`
   (describe the picture) and an optional `caption`.
3. If a tall or wide photo crops badly in its square frame, set
   `focus: "50% 25%"` (horizontal % vertical %) to choose what stays visible.

The first `gallery.initialCount` photos show straight away; the rest appear
with "View More Photos". The lightbox always shows the whole photo.

### Countdown

`birthday.iso` in `siteConfig.ts` is `2026-10-29T00:00:00+05:30` (midnight in
Asia/Kolkata). After that moment the card switches to "Today Is Your Special
Day! ♡" for 24 hours, then to `countdown.afterHeading`.

## Where things live

```
src/
  app/            layout (fonts, metadata), page, globals.css (theme + all CSS cat animations)
  components/
    cats/         CatFigure (SVG drawings), Cat (tap/hover interactions),
                  RunningCat (scroll-synced runners), CatDecorations (peek, chase,
                  sleep/stretch, stroll, slide-out, jump, climb, timeline, edge-peek)
    decorations/  doodles, floating hearts, cloud dividers
    ui/           section heading, heart bursts, ♡ text helper
    Navbar, Hero, BirthdayCountdown, Gallery, PhotoLightbox, Memories, SpecialMessage, Footer
  data/           ← edit these
  hooks/          countdown, active section, reduced motion, scroll progress
  lib/            shared animation settings
```

Motion respects the visitor's "reduce motion" setting: running and floating
loops stop, and the running cats sit still instead.

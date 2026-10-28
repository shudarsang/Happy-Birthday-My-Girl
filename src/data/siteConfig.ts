/**
 * ♡ Everything personal lives here ♡
 *
 * Edit the words below to make the site yours. Any "♡" you type is
 * automatically drawn as a little pink heart on the page.
 */
export const siteConfig = {
  brand: "For You",

  birthday: {
    /**
     * 29 October 2026 at 00:00 in Asia/Kolkata (IST is always UTC+05:30,
     * there is no daylight saving), written as an ISO timestamp so the
     * countdown is correct for visitors in any timezone.
     */
    iso: "2026-10-29T00:00:00+05:30",
    timeZone: "Asia/Kolkata",
    display: "29 / 10 / 2026",
  },

  hero: {
    intro: "To my favorite person ♡",
    headingTop: "Happy Birthday",
    headingBottom: "My Love!",
    message: ["Another year, another reason to love you more ♡", "Thank you for being you!"],
    /** Swap this for any illustration you like (put the file in /public/images). */
    illustration: {
      src: "/images/couple.png",
      alt: "Illustration of a couple: he kisses her cheek while she smiles with her eyes closed",
      width: 596,
      height: 444,
    },
  },

  countdown: {
    heading: "Your Special Day Is In...",
    todayHeading: "Today Is Your Special Day! ♡",
    afterHeading: "Happy Birthday, My Love! ♡",
  },

  gallery: {
    title: "Our Gallery",
    subtitle: "A collection of our favorite moments ♡",
    /** How many photos show before "View More Photos" is pressed. */
    initialCount: 5,
  },

  memories: {
    title: "Our Little World ♡",
    subtitle: "Little moments that mean the world to me",
  },

  message: {
    title: "Just For You ♡",
    greeting: "To my favorite person,",
    paragraphs: [
      "You make my ordinary days feel special, and every little moment with you becomes a memory I want to keep forever.",
      "I hope this birthday brings you as much happiness as you bring into my life.",
    ],
    closing: "Happy Birthday, my love. ♡",
    signature: "— Yours, always",
    surpriseButton: "A Little Surprise",
    surpriseHideButton: "Hide the Surprise",
    surprise: {
      title: "Psst... one more thing ♡",
      text: "Close your eyes and make a wish. Whatever it is, I'll be right here cheering for you, today and every day after. I love you more than all the stars in the sky. ♡",
    },
  },

  footer: {
    line: "I'm so lucky to have you in my life ♡",
    closing: "Made with love, just for you. ♡",
  },

  /** Little things the cats say when you tap them. */
  catPhrases: ["Meow! ♡", "Purr~", "Mrrp? ♡", "Nya~", "Happy birthday!", "Love you! ♡"],
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "gallery", label: "Gallery" },
  { id: "memories", label: "Our Memories" },
  { id: "message", label: "A Special Message" },
] as const;

export type NavId = (typeof navItems)[number]["id"];

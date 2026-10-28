import type { Metadata, Viewport } from "next";
import { Caveat, Caveat_Brush, Mali, Nunito } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const caveatBrush = Caveat_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-caveat-brush",
  display: "swap",
});
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap" });
const mali = Mali({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-mali",
  display: "swap",
});
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });

export const metadata: Metadata = {
  title: "Happy Birthday, My Love ♡",
  description: "A little birthday surprise, made with love — just for you.",
  // A private gift — keep it out of search engines.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FFE3EE",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${caveatBrush.variable} ${caveat.variable} ${mali.variable} ${nunito.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

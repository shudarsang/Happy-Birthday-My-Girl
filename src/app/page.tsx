import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { IntroProvider } from "@/components/intro/IntroProvider";
import { Memories } from "@/components/Memories";
import { Navbar } from "@/components/Navbar";
import { OffscreenPauser } from "@/components/OffscreenPauser";
import { SpecialMessage } from "@/components/SpecialMessage";

export default function Home() {
  return (
    <IntroProvider>
      <Navbar />
      <main>
        <Hero />
        <Gallery />
        <Memories />
        <SpecialMessage />
      </main>
      <Footer />
      <OffscreenPauser />
    </IntroProvider>
  );
}

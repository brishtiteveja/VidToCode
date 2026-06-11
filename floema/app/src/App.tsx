import { useState, useCallback } from "react";
import { useLenis } from "./hooks/useLenis";
import { useSectionTheme } from "./hooks/useSectionTheme";
import Preloader from "./components/Preloader";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import SectionStack from "./components/SectionStack";
import FooterSection from "./components/FooterSection";
import { sections } from "./data/sections";

export default function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const { theme, registerSection } = useSectionTheme();

  // Initialize Lenis smooth scroll
  useLenis();

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      {/* Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Navigation */}
      <Navigation theme={theme} visible={preloaderDone} />

      {/* Main content */}
      <main>
        {/* Hero */}
        <HeroSection visible={preloaderDone} registerSection={registerSection} />

        {/* Product Sections — single viewport, images stack/cover each other */}
        <SectionStack sections={sections} registerSection={registerSection} />

        {/* Footer */}
        <FooterSection registerSection={registerSection} />
      </main>
    </>
  );
}

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Intro from "./components/Intro";
import TopNav from "./components/TopNav";
import Hero from "./sections/Hero";
import StatementBand from "./sections/StatementBand";
import Problem from "./sections/Problem";
import Cases from "./sections/Cases";
import TrustEngine from "./sections/TrustEngine";
import Testimonials from "./sections/Testimonials";
import Comparison from "./sections/Comparison";
import CtaFooter from "./sections/CtaFooter";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="min-h-screen bg-paper">
      <AnimatePresence>
        {!introDone && <Intro onDone={() => setIntroDone(true)} />}
      </AnimatePresence>

      <TopNav />
      <main>
        <Hero start={introDone} />
        <StatementBand />
        <Problem />
        <Cases />
        <TrustEngine />
        <Testimonials />
        <Comparison />
      </main>
      <CtaFooter />
    </div>
  );
}

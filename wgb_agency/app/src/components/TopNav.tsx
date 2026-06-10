import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Spark from "./Spark";
import Button from "./Button";
import { nav } from "../content";

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-paper/85 backdrop-blur-md" : "border-transparent bg-paper/0"
      }`}
    >
      <div className="mx-auto flex max-w-shell items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 text-ink">
          <Spark className="h-6 w-6" />
          <span className="font-display text-2xl font-extrabold lowercase tracking-tight">wgb</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="flex items-center gap-1 text-[14px] font-medium text-ink/80 transition-colors hover:text-ink"
            >
              {l}
              {l === "Resources" && <Chevron />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden items-center gap-1 text-[13px] font-medium text-ink/70 hover:text-ink sm:flex">
            <Globe /> EN <Chevron />
          </button>
          <Button variant="blue">{nav.cta}</Button>
        </div>
      </div>
    </motion.header>
  );
}

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function Globe() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 8h13M8 1.5c2 2 2 11 0 13M8 1.5c-2 2-2 11 0 13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

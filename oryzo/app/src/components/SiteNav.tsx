import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { brand, navLinks } from "../lib/content";

/**
 * Fixed top nav. Wordmark left, INTRO / FEATURES / PRODUCT / CONTACT right.
 * Clicking a link smooth-scrolls to the matching section anchor; the active link
 * underlines based on scroll position via an IntersectionObserver over the four
 * anchor regions (#intro, #features, #product, #contact).
 *
 * NOTE: the original recording showed a faux browser chrome bar ("oryzo.ai/",
 * "Ask Chat") at the very top — that was the screen recorder's own window, not
 * part of the site, so it is intentionally omitted per the brief.
 */
export default function SiteNav() {
  const [active, setActive] = useState<string>("intro");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
    >
      <nav className="flex items-center justify-between px-8 py-5 md:px-10">
        <a
          href="#intro"
          onClick={(e) => handleClick(e, "#intro")}
          className="font-display text-xl font-900 tracking-tight text-cream"
          style={{ fontWeight: 900 }}
        >
          {brand.wordmark}
        </a>
        <ul className="flex items-center gap-6 text-[11px] font-semibold tracking-eyebrow text-cream md:gap-8 md:text-xs">
          {navLinks.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="py-1 transition-opacity hover:opacity-70"
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-cream"
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}

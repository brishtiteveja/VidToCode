import { useEffect, useState, useCallback, useRef } from "react";

export type NavTheme = "dark" | "light";

export function useSectionTheme() {
  const [theme, setTheme] = useState<NavTheme>("dark");
  const sectionRefs = useRef<Map<string, { element: HTMLElement; theme: NavTheme }>>(new Map());

  const registerSection = useCallback(
    (id: string, element: HTMLElement | null, sectionTheme: NavTheme) => {
      if (element) {
        sectionRefs.current.set(id, { element, theme: sectionTheme });
      } else {
        sectionRefs.current.delete(id);
      }
    },
    []
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    const checkTheme = () => {
      const viewportCenter = window.innerHeight / 3;
      let currentTheme: NavTheme = "dark";

      sectionRefs.current.forEach(({ element, theme: sectionTheme }) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          currentTheme = sectionTheme;
        }
      });

      setTheme(currentTheme);
    };

    // Use scroll listener for precise theme detection
    window.addEventListener("scroll", checkTheme, { passive: true });
    checkTheme();

    return () => {
      window.removeEventListener("scroll", checkTheme);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return { theme, registerSection };
}

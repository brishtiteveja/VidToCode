import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Scroll-position-based section theme detection. Register sections of the page
 * with a theme label, and the hook returns whichever theme label is at a given
 * viewport position (default: one-third from the top).
 *
 * Designed for adaptive navigation bars that switch between light and dark
 * depending on the section background. The theme labels are generic strings —
 * consumers define what `"dark"` or `"light"` means in their nav component.
 *
 * ```tsx
 * const { theme, registerSection } = useSectionTheme("dark");
 * // Register in each section:
 * <section ref={el => registerSection("hero", el, "dark")} />
 * <section ref={el => registerSection("photos", el, "light")} />
 * // Nav reads `theme` to pick colors.
 * ```
 */
export function useSectionTheme<T extends string = string>(
  defaultTheme?: T,
): {
  theme: T;
  registerSection: (id: string, element: HTMLElement | null, theme: T) => void;
} {
  const fallback = (defaultTheme ?? "dark") as T;
  const [theme, setTheme] = useState<T>(fallback);
  const sectionsRef = useRef<Map<string, { element: HTMLElement; theme: T }>>(
    new Map(),
  );

  const registerSection = useCallback(
    (id: string, element: HTMLElement | null, sectionTheme: T) => {
      if (element) {
        sectionsRef.current.set(id, { element, theme: sectionTheme });
      } else {
        sectionsRef.current.delete(id);
      }
    },
    [],
  );

  useEffect(() => {
    const check = () => {
      const probe = window.innerHeight / 3;
      let current = fallback;

      sectionsRef.current.forEach(({ element, theme: t }) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom >= probe) {
          current = t;
        }
      });

      setTheme(current);
    };

    window.addEventListener("scroll", check, { passive: true });
    check();

    return () => window.removeEventListener("scroll", check);
  }, [fallback]);

  return { theme, registerSection };
}

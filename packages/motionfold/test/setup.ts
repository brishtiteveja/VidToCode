import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { hasReducedMotionListener, prefersReducedMotion } from "motion-dom";

declare global {
  // Toggled by tests to simulate `prefers-reduced-motion: reduce`.
  // eslint-disable-next-line no-var
  var __reducedMotion: boolean;
}

globalThis.__reducedMotion = false;

// jsdom lacks matchMedia; back it by the toggle so we can test fallbacks.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: /prefers-reduced-motion/.test(query) ? globalThis.__reducedMotion : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }),
});

// jsdom lacks these observers used by hooks/Framer.
class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.ResizeObserver = NoopObserver as unknown as typeof ResizeObserver;
globalThis.IntersectionObserver = NoopObserver as unknown as typeof IntersectionObserver;

// Framer caches the reduced-motion result in a module singleton on first use
// (and doesn't re-render on change). Reset it before each test so toggling
// `__reducedMotion` actually re-initializes from our matchMedia mock.
beforeEach(() => {
  hasReducedMotionListener.current = false;
  prefersReducedMotion.current = null;
});

afterEach(() => {
  cleanup();
  globalThis.__reducedMotion = false;
});

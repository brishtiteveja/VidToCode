import { useCallback, useLayoutEffect, useRef, useState } from "react";

export interface ElementSize {
  width: number;
  height: number;
}

/**
 * Observes an element's content-box size with `ResizeObserver`.
 *
 * Returns a `ref` callback to attach to the target plus its current `size`.
 * SSR-safe: starts at `{ 0, 0 }` and updates after mount.
 */
export function useElementSize<T extends HTMLElement = HTMLDivElement>(): {
  ref: (node: T | null) => void;
  size: ElementSize;
} {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });
  const observerRef = useRef<ResizeObserver | null>(null);
  const nodeRef = useRef<T | null>(null);

  const measure = useCallback((node: T) => {
    const rect = node.getBoundingClientRect();
    setSize((prev) =>
      prev.width === rect.width && prev.height === rect.height
        ? prev
        : { width: rect.width, height: rect.height },
    );
  }, []);

  const ref = useCallback(
    (node: T | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      nodeRef.current = node;
      if (!node || typeof ResizeObserver === "undefined") return;
      measure(node);
      const observer = new ResizeObserver(() => measure(node));
      observer.observe(node);
      observerRef.current = observer;
    },
    [measure],
  );

  useLayoutEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  return { ref, size };
}

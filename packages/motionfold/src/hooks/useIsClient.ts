import { useEffect, useState } from "react";

/**
 * Returns `false` on the server and during the first client render, then
 * `true` after hydration. Use it to gate browser-only effects so SSR markup
 * matches the initial client render (avoids hydration mismatches).
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
}

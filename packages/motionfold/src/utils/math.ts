/** Clamp `n` into the inclusive `[min, max]` range. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

/** Linear interpolation between `a` and `b` by `t` (0–1). */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Remap `n` from the input range `[inMin, inMax]` to `[outMin, outMax]`.
 * Optionally clamps the result to the output range.
 */
export function mapRange(
  n: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  doClamp = false,
): number {
  const t = inMax === inMin ? 0 : (n - inMin) / (inMax - inMin);
  const out = outMin + t * (outMax - outMin);
  return doClamp ? clamp(out, Math.min(outMin, outMax), Math.max(outMin, outMax)) : out;
}

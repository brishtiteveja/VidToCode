import { describe, it, expect } from "vitest";
import {
  easeOutExpo,
  easings,
  durations,
  springPop,
  springs,
  fadeUp,
  scaleReveal,
  clipRevealLR,
  blurToSharp,
  staggerContainer,
  staggerLines,
  inViewOnce,
  clamp,
  lerp,
  mapRange,
} from "../src";

describe("tokens", () => {
  it("exposes cubic-bezier easings as 4-tuples", () => {
    expect(easeOutExpo).toEqual([0.16, 1, 0.3, 1]);
    expect(easings.outExpo).toBe(easeOutExpo);
    expect(durations.base).toBeGreaterThan(0);
  });

  it("exposes spring transitions", () => {
    expect(springPop.type).toBe("spring");
    expect(springs.pop).toBe(springPop);
  });

  it("variants expose hidden/visible states", () => {
    for (const v of [fadeUp, scaleReveal, clipRevealLR, blurToSharp]) {
      expect(v.hidden).toBeDefined();
      expect(v.visible).toBeDefined();
    }
  });

  it("staggerContainer builds timing and staggerLines aliases it", () => {
    const c = staggerContainer(0.2, 0.1);
    expect(c.visible).toMatchObject({
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    });
    expect(staggerLines).toBe(staggerContainer);
    expect(inViewOnce.once).toBe(true);
  });
});

describe("utils", () => {
  it("clamp", () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0, 3)).toBe(0);
    expect(clamp(2, 0, 3)).toBe(2);
  });
  it("lerp", () => {
    expect(lerp(0, 10, 0.5)).toBe(5);
  });
  it("mapRange with clamp", () => {
    expect(mapRange(5, 0, 10, 0, 100)).toBe(50);
    expect(mapRange(20, 0, 10, 0, 100, true)).toBe(100);
  });
});

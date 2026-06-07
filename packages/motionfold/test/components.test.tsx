import { describe, it, expect } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { hasReducedMotionListener, prefersReducedMotion } from "motion-dom";
import {
  CropFrame,
  ScrollCue,
  GlowBorder,
  TextReveal,
  KineticHeadline,
  ShrinkToAnchor,
  FramedSlider,
  MagnifyCarousel,
  VectorBuildIntro,
  ExpandingHighlight,
  IntroCurtain,
  type Slide,
} from "../src";

function setReduced(v: boolean) {
  globalThis.__reducedMotion = v;
  // Force Framer to re-read the media query on the next render.
  hasReducedMotionListener.current = false;
  prefersReducedMotion.current = null;
}

const slides: Slide[] = [
  { key: "a", content: <div>Slide A</div> },
  { key: "b", content: <div>Slide B</div> },
  { key: "c", content: <div>Slide C</div> },
];

describe("CropFrame", () => {
  it("renders children and four corner handles", () => {
    const { container } = render(
      <CropFrame>
        <div>Inside</div>
      </CropFrame>,
    );
    expect(screen.getByText("Inside")).toBeInTheDocument();
    expect(container.querySelectorAll("span")).toHaveLength(4);
  });

  it("omits handles when disabled", () => {
    const { container } = render(<CropFrame handles={false}>x</CropFrame>);
    expect(container.querySelectorAll("span")).toHaveLength(0);
  });
});

describe("ScrollCue", () => {
  it("renders its label", () => {
    render(<ScrollCue label="KEEP GOING" />);
    expect(screen.getByText("KEEP GOING")).toBeInTheDocument();
  });
});

describe("GlowBorder", () => {
  it("renders children in both motion modes", () => {
    for (const reduced of [true, false]) {
      setReduced(reduced);
      render(<GlowBorder>Glowing</GlowBorder>);
      expect(screen.getByText("Glowing")).toBeInTheDocument();
      cleanup();
    }
  });
});

describe("TextReveal", () => {
  it("renders plain text", () => {
    render(<TextReveal>Headline here</TextReveal>);
    expect(screen.getByText("Headline here")).toBeInTheDocument();
  });

  it("splits words into separate spans when splitWords", () => {
    const { container } = render(
      <TextReveal splitWords>one two three</TextReveal>,
    );
    const wordSpans = Array.from(container.querySelectorAll("span")).filter(
      (s) => s.textContent && s.textContent.trim().length > 0,
    );
    expect(wordSpans.map((s) => s.textContent)).toEqual(["one", "two", "three"]);
  });
});

describe("KineticHeadline", () => {
  it("renders children", () => {
    render(<KineticHeadline>FIELD</KineticHeadline>);
    expect(screen.getByText("FIELD")).toBeInTheDocument();
  });
});

describe("reduced-motion fallbacks render content", () => {
  it("ShrinkToAnchor shows the headline when reduced", () => {
    setReduced(true);
    render(<ShrinkToAnchor headline="it's wearable" eyebrow="SO PORTABLE" />);
    expect(screen.getByText("it's wearable")).toBeInTheDocument();
  });

  it("FramedSlider renders all slides when reduced", () => {
    setReduced(true);
    render(<FramedSlider slides={slides} />);
    expect(screen.getByText("Slide A")).toBeInTheDocument();
    expect(screen.getByText("Slide C")).toBeInTheDocument();
  });

  it("MagnifyCarousel renders all slides when reduced", () => {
    setReduced(true);
    render(<MagnifyCarousel slides={slides} />);
    expect(screen.getByText("Slide B")).toBeInTheDocument();
  });

  it("ExpandingHighlight renders children when reduced", () => {
    setReduced(true);
    render(
      <ExpandingHighlight>
        <p>Trust Engine</p>
      </ExpandingHighlight>,
    );
    expect(screen.getByText("Trust Engine")).toBeInTheDocument();
  });
});

describe("VectorBuildIntro fallback is simpler than full motion", () => {
  it("renders fewer DOM nodes under reduced motion", () => {
    setReduced(true);
    const { container: reducedC } = render(
      <VectorBuildIntro>
        <div>HERO</div>
      </VectorBuildIntro>,
    );
    expect(screen.getByText("HERO")).toBeInTheDocument();
    const reducedNodes = reducedC.querySelectorAll("*").length;
    cleanup();

    setReduced(false);
    const { container: fullC } = render(
      <VectorBuildIntro>
        <div>HERO</div>
      </VectorBuildIntro>,
    );
    const fullNodes = fullC.querySelectorAll("*").length;
    expect(fullNodes).toBeGreaterThan(reducedNodes);
  });
});

describe("IntroCurtain", () => {
  it("shows the message over the content under full motion", () => {
    setReduced(false);
    render(
      <IntroCurtain message="We orbit only around what matters">
        <div>Revealed</div>
      </IntroCurtain>,
    );
    expect(
      screen.getByText("We orbit only around what matters"),
    ).toBeInTheDocument();
    expect(screen.getByText("Revealed")).toBeInTheDocument();
  });

  it("skips the curtain (no message) under reduced motion", () => {
    setReduced(true);
    render(
      <IntroCurtain message="We orbit only around what matters">
        <div>Revealed</div>
      </IntroCurtain>,
    );
    expect(screen.getByText("Revealed")).toBeInTheDocument();
    expect(
      screen.queryByText("We orbit only around what matters"),
    ).not.toBeInTheDocument();
  });
});

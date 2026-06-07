import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import type { MotionValue } from "framer-motion";
import { Reveal, StaggerGroup, StaggerItem, StickyScene } from "../src";

describe("Reveal", () => {
  it("renders children", () => {
    render(<Reveal>Revealed content</Reveal>);
    expect(screen.getByText("Revealed content")).toBeInTheDocument();
  });
});

describe("StaggerGroup / StaggerItem", () => {
  it("renders all items", () => {
    render(
      <StaggerGroup>
        <StaggerItem>One</StaggerItem>
        <StaggerItem>Two</StaggerItem>
      </StaggerGroup>,
    );
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});

describe("StickyScene", () => {
  it("passes a MotionValue progress to its render-prop child", () => {
    let received: MotionValue<number> | null = null;
    render(
      <StickyScene>
        {(progress) => {
          received = progress;
          return <div>Scene content</div>;
        }}
      </StickyScene>,
    );
    expect(screen.getByText("Scene content")).toBeInTheDocument();
    expect(received).not.toBeNull();
    expect(typeof received!.get).toBe("function");
  });
});

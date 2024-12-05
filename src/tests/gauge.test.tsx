import { render } from "@testing-library/react";
import { Gauge } from "@/components/ui/gauge";

describe("Gauge Component", () => {
  it("renders the correct number of bars based on percentage", () => {
    const { container } = render(<Gauge color="green" label="Test" percentage={50} />);
    const bars = container.querySelectorAll(".flex-1");

    // 5 barres remplies pour 50%
    expect(bars.length).toBe(10);
    expect(Array.from(bars).filter(bar => bar.classList.contains("bg-green-600")).length).toBe(5);
  });
});

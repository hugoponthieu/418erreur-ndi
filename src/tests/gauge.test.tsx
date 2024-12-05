import { render } from "@testing-library/react";
import { Gauge } from "@/components/ui/gauge";

describe("Gauge Component", () => {
  it("renders the correct number of bars based on percentage", () => {
    const { container } = render(<Gauge color="green" label="Test" percentage={50} />);
    const bars = container.querySelectorAll(".flex-1");

    // Total bars should be 10
    expect(bars.length).toBe(10);

    // 5 bars should have the 'bg-green-600' class
    expect(Array.from(bars).filter(bar => bar.classList.contains("bg-green-600")).length).toBe(5);
  });
});

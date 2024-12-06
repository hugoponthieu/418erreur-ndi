import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Gauge } from "@/components/ui/gauge";

describe("Gauge Component", () => {
  it("renders the correct number of filled bars based on percentage", () => {
    render(<Gauge color="green" percentage={50} label="Gauge Test" />);
    const filledBars = document.querySelectorAll("bg-retrogreen");
    expect(filledBars.length).toBe(5);
  });

  it("renders the correct tooltip label", async () => {
    render(<Gauge color="blue" percentage={70} label="Blue Gauge" />);
    expect(screen.getByText(/Blue Gauge/i)).toBeInTheDocument();
  });
});

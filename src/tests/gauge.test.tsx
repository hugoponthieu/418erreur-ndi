import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Gauge } from "@/components/ui/gauge";
import userEvent from "@testing-library/user-event";

describe("Gauge Component", () => {
  it("renders the tooltip with the correct label", async () => {
    const user = userEvent.setup(); // Initialize userEvent

    render(<Gauge color="pink" percentage={50} label="Pink Gauge" />);

    // Hover over the trigger to show the tooltip
    const trigger = screen.getByRole("button"); // TooltipTrigger is a button
    await user.hover(trigger);

    // Wait for the tooltip content to appear, specifying the role or exact tooltip container
    const tooltipContent = await screen.findByRole("tooltip", {
      name: /Pink Gauge/i, // Use regex to match case-insensitively
    });

    expect(tooltipContent).toBeInTheDocument();
  });
});

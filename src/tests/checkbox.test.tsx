import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "@/components/ui/checkbox";
import "@testing-library/jest-dom";

describe("Checkbox Component", () => {
  it("toggles checked state on click", async () => {
    render(<Checkbox id="terms" />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});

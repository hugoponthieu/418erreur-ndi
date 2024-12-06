import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";

describe("Button Component", () => {
  it("renders the button with correct text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText(/Click me/i)).toBeInTheDocument();
  });

  it("triggers the onClick event handler when clicked", async () => {
    const mockHandler = jest.fn();
    render(<Button onClick={mockHandler}>Click me</Button>);
    const button = screen.getByText(/Click me/i);
    await userEvent.click(button);
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  it("disables the button when the disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByText(/Disabled/i);
    expect(button).toBeDisabled();
  });
});


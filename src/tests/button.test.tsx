import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  it("applies custom classes", () => {
    render(<Button className="custom-class">Custom Button</Button>);
    const buttonElement = screen.getByText(/custom button/i);
    expect(buttonElement).toHaveClass("custom-class");
  });
});

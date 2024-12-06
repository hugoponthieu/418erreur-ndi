import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

describe("Dialog Component", () => {
  it("renders the dialog when open", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText(/Dialog Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Dialog Description/i)).toBeInTheDocument();
  });

  it("does not render when closed", () => {
    render(
      <Dialog open={false}>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    expect(screen.queryByText(/Dialog Title/i)).not.toBeInTheDocument();
  });

  it("calls the onClose callback when the close button is clicked", async () => {
    const mockHandler = jest.fn();
    render(
      <Dialog open onOpenChange={mockHandler}>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    const closeButton = screen.getByRole("button", { name: /Close/i });
    await userEvent.click(closeButton);

    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
});

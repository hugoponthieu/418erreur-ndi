import { render, screen } from "@testing-library/react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

describe("Dialog Component", () => {
  it("renders correctly when open", () => {
    render(
      <Dialog open={true}>
        <DialogContent>
          <DialogTitle>Test Dialog</DialogTitle>
          <DialogDescription>This is a description of the dialog</DialogDescription>
          <p>Dialog content goes here</p>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText("Test Dialog")).toBeInTheDocument();
    expect(screen.getByText("Dialog content goes here")).toBeInTheDocument();
  });
});

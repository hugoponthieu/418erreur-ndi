import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router";
import { router } from "@/router";

describe("App Router", () => {
  it("renders the App component for '/' route", () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ["/"],
    });
    render(<RouterProvider router={testRouter} />);
    expect(screen.getByText(/RACE FOR WATER/i)).toBeInTheDocument();
  });

  it("renders the Counter component for '/game' route", () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ["/game"],
    });
    render(<RouterProvider router={testRouter} />);
    expect(screen.getByText(/Compteur:/i)).toBeInTheDocument();
  });

  it("renders the Components page for '/components' route", () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: ["/components"],
    });
    render(<RouterProvider router={testRouter} />);
    expect(screen.getByText(/ToxicityIcon/i)).toBeInTheDocument();
  });
});

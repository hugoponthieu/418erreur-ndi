import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import counterReducer from "@/features/counter/counterSlice"; // Adjust the path to your counter slice
import { router } from "@/router";
import "@testing-library/jest-dom";

test("navigates to /game and renders Counter component", () => {
  // Create a mock store
  const store = configureStore({
    reducer: {
      counter: counterReducer,
    },
  });

  const testRouter = createMemoryRouter(router.routes, { initialEntries: ["/game"] });

  // Wrap the component with Redux Provider
  render(
    <Provider store={store}>
      <RouterProvider router={testRouter} />
    </Provider>
  );

  expect(screen.getByText(/Compteur:/i)).toBeInTheDocument();
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Counter from "@/Counter";
import counterReducer from "@/features/counter/counterSlice";

describe("Counter Component", () => {
  const store = configureStore({
    reducer: { counter: counterReducer },
  });

  it("displays the initial count value", () => {
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );
    expect(screen.getByText(/Compteur: 0/i)).toBeInTheDocument();
  });

  it("increments the count when a button is clicked", async () => {
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    const button = screen.getByText(/Plastique/i);
    await userEvent.click(button);

    expect(screen.getByText(/Compteur: 1/i)).toBeInTheDocument();
  });
});

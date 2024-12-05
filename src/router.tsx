import { createBrowserRouter } from "react-router";
import App from "./App";
import { Components } from "./pages/Components";
import Counter from "./Counter";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/components",
    Component: Components,
  },
  {
    path: "/game",
    Component: Counter,
  }
]);

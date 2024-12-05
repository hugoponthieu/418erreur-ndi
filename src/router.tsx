import { createBrowserRouter } from "react-router";
import App from "./App";
import { Components } from "./pages/Components";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/components",
    Component: Components,
  },
]);

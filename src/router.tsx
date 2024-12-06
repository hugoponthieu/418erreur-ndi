import { createBrowserRouter } from "react-router";
import App from "./App";
import { Components } from "./pages/Components";
import { Game } from "./pages/Game";

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
    Component: Game,
  },
]);

import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import { Game } from "./pages/Game";
import { useAccess } from "./components/ui/access-provider";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { canAccessGame } = useAccess();
  return canAccessGame ? children : <Navigate to="/" />;
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/game",
    Component: () => (
      <ProtectedRoute>
        <Game />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  }
]);

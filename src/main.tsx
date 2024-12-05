import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { router } from "./router.tsx";
import {store} from "@/app/store.ts";
import {Provider} from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
  </StrictMode>
);

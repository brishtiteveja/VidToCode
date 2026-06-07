import { createBrowserRouter } from "react-router-dom";
import App from "./App";

/** Single route — this is a one-page scroll experience. */
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);

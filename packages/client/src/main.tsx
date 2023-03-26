import App from "./App";
import React from "react";
import axios from "axios";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      const getCoursesUrl = "http://localhost:5174/api/courses";
      const response = await axios.get(getCoursesUrl);
      return response.data.courses;
    },
  },
  {
    path: "courses/:courseName",
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

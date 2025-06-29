import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthPages from "./pages/StarterPage.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/home" replace />,
    },
    {
      path: "/home/*",
      element: <Home />,
    },
    {
      path: "/auth/*",
      element: <AuthPages />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

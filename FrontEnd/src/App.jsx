import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import AuthPages from "./pages/auth/StarterPage.jsx";
import ErrorPage from "./pages/errorPage.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/home" replace />,
      errorElement: <ErrorPage />,
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

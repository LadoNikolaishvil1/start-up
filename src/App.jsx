import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import AuthPages from "./pages/StarterPage";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import UserSelect from "./pages/UserSellect";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/", // changed from '*' to '/' for proper nested routing
    element: <AuthPages />,
    children: [
      {
        path: "logIn", // removed leading slash
        element: <Login />,
      },
      {
        path: "signUp", // removed leading slash
        element: <SignUp />,
      },
      {
        path: "userSelect", // removed leading slash
        element: <UserSelect />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

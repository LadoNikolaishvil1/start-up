import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home.jsx";
import AuthPages from "./pages/StarterPage.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/SignUp.jsx";
import UserSelect from "./pages/UserSellect.jsx";
import Browse from "./pages/Browse.jsx";
import Matches from "./pages/Matches.jsx";
import Messages from "./pages/Messages.jsx";
import { Settings } from "lucide-react";
import Recommended from "./pages/Recommended.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "matches",
        element: <Matches />,
      },
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "recommended",
        element: <Recommended />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthPages />,
    children: [
      {
        path: "logIn",
        element: <Login />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "userSelect",
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

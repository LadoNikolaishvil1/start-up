import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AuthPages from "./pages/StarterPage.jsx";
// import Login from "./pages/LogIn.jsx";
// import SignUp from "./pages/SignUp.jsx";
// import UserSelect from "./pages/UserSellect.jsx";
import Browse from "./pages/Browse.jsx";
import Matches from "./pages/Matches.jsx";
import Messages from "./pages/Messages.jsx";
import Settings from "./pages/Settings.jsx";
import Recommended from "./pages/Recommended.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/home",
      element: <Home />,
      children: [
        { path: "browse", element: <Browse /> },
        { path: "matches", element: <Matches /> },
        { path: "messages", element: <Messages /> },
        { path: "recommended", element: <Recommended /> },
        { path: "settings", element: <Settings /> },
      ],
    },
    {
      path: "/*",
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

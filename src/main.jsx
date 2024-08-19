// index.js
import React from "react";
import { createRoot } from "react-dom/client";

import Layout from "./Layout.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./provider/themeProvider.jsx";
import { ContextProvider } from "./provider/contextProvider.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/Cart.jsx";
import Menu from "./pages/Menu.jsx";
import ProfileAccount from "./components/ProfileAccount.jsx";
import Address from "./components/Address.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile/account",
            element: <ProfileAccount />,
          },
          {
            path: "/profile/address",
            element: <Address />,
          },
        ],
      },
      {
        path: "/cart",
        element: <About />,
      },
      { path: "/menu", element: <Menu /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <ThemeProvider defaultTheme="dark" storageKey="theme">
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </ThemeProvider>
);

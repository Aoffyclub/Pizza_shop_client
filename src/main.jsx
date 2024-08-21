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
import Cart from "./pages/Cart.jsx";
import Menu from "./pages/Menu.jsx";
import Order from "./pages/Order.jsx";
import ProfileAccount from "./components/ProfileAccount.jsx";
import Address from "./components/Address.jsx";
import OrderDetail from "./pages/OrderDetail.jsx";

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
        path: "profile", // Removed leading slash
        element: <Profile />,
        children: [
          {
            path: "account", // Relative path, no leading slash
            element: <ProfileAccount />,
          },
          {
            path: "address", // Relative path, no leading slash
            element: <Address />,
          },
        ],
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "order/:orderId",
        element: <OrderDetail />,
      },
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

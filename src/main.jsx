import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Layout from "./Layout.jsx"; // Import the new Layout component
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
    element: <Layout />, // Use Layout as the root element
    children: [
      {
        index: true, // Matches the '/' path
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

// Render the application to the DOM
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </ThemeProvider>
  </StrictMode>
);

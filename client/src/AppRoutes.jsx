import { createBrowserRouter, RouterProvider } from "react-router";

import React from "react";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import AdminHome from "./pages/private/AdminHome";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <AdminHome />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;

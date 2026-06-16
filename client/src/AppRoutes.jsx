import { createBrowserRouter, RouterProvider } from "react-router";

import React from "react";
import AdminLayout from "./layout/AdminLayout";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Matches from "./pages/public/Matches";
import Players from "./pages/public/Players";
import Register from "./pages/public/Register";
import Series from "./pages/public/Series";
import Teams from "./pages/public/Teams";
import AdminHome from "./pages/private/AdminHome";
import AdminMatches from "./pages/private/AdminMatches";
import AdminPlayers from "./pages/private/AdminPlayers";
import AdminPlayingXI from "./pages/private/AdminPlayingXI";
import AdminSeries from "./pages/private/AdminSeries";
import AdminTeams from "./pages/private/AdminTeams";
import CreateMatch from "./pages/private/CreateMatch";
import EditMatch from "./pages/private/EditMatch";

const AppRoutes = () => {
  const router = createBrowserRouter([
    // Public routes share the fan-facing shell and navigation.
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
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/players",
          element: <Players />,
        },
        {
          path: "/teams",
          element: <Teams />,
        },
        {
          path: "/series",
          element: <Series />,
        },
        {
          path: "/matches",
          element: <Matches />,
        },
      ],
    },
    // Admin routes use a separate operations shell with admin navigation.
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "",
          element: <AdminHome />,
        },
        {
          path: "players",
          element: <AdminPlayers />,
        },
        {
          path: "teams",
          element: <AdminTeams />,
        },
        {
          path: "series",
          element: <AdminSeries />,
        },
        {
          path: "matches",
          element: <AdminMatches />,
        },
        {
          path: "matches/create",
          element: <CreateMatch />,
        },
        {
          path: "matches/edit/:id",
          element: <EditMatch />,
        },
        {
          path: "playing-xi/:matchId",
          element: <AdminPlayingXI />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;

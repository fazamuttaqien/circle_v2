import AuthLayout from "@/layout/AuthLayout";
import RootLayout from "@/layout/RootLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Followings from "@/pages/Followings";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Search from "@/pages/Search";
import { RouteObject } from "react-router-dom";

const router: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "follows",
        element: <Followings />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default router;

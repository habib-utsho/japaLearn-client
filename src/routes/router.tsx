import { createBrowserRouter, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import MainLayout from "../components/layout/MainLayout";
import Signin from "../pages/Signin";
import ProtectedRoute from "./PrivateRoutes/ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
import { routesGenerator } from "../utils/routesGenerator";
import { userPaths } from "./paths/userPaths";
import AdminRoute from "./PrivateRoutes/AdminRoute";
import { adminPaths } from "./paths/adminPaths";
import Signup from "../pages/Signup";
import Lessons from "../pages/Lessons";
import Tutorials from "../pages/Tutorials";
import Lesson from "../pages/Lesson";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/signin" />,
      },
      {
        path: "/lessons",
        element: (
          <ProtectedRoute>
            <Lessons />
          </ProtectedRoute>
        ),
      },
      {
        path: "/lessons/:id",
        element: (
          <ProtectedRoute>
            <Lesson />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tutorials",
        element: (
          <ProtectedRoute>
            <Tutorials />
          </ProtectedRoute>
        ),
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },

  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routesGenerator(userPaths),
  },
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: routesGenerator(adminPaths),
  },
]);

export default router;

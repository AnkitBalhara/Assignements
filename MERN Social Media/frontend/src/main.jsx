import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import HomePage from "../src/pages/HomePage.jsx";
import LoginPage from "../src/pages/LoginPage.jsx";
import ProfilePage from "../src/pages/ProfilePage.jsx";
import SettingPage from "../src/pages/SettingPage.jsx";
import SignUpPage from "../src/pages/SignUpPage.jsx";
import { useAuth } from "./context/useAuthStore.jsx";

// Wrapper for routes to access `authUser`
const ProtectedRoute = ({ element }) => {
  const { authUser } = useAuth();
  return authUser ? element : <Navigate to="/login" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute element={<HomePage />} />
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute element={<LoginPage />} />
        ),
      },
      {
        path: "/signup",
        element: <SignUpPage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute element={<ProfilePage />} />
        ),
      },
      {
        path: "/setting",
        element: (
          <ProtectedRoute element={<SettingPage />} />
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

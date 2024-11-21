import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider,createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import VerifyOTP from "./components/VerifyOTP.jsx";
import Profile from "./components/Profile.jsx";
import ForgetPassword from "./components/ForgetPassword.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
      {
        path: "/verifyOtp",
        element: <VerifyOTP />,
      },
      {
        path: "/forgetpassword",
        element: <ForgetPassword />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

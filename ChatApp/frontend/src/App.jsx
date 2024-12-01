import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  // const {authUser} =useAuthStore()
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;

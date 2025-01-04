import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/useAuthStore.jsx";

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-black text-white py-4 shadow-md">
          <div className="container mx-auto px-4">
            <span className="text-2xl font-bold">MERN Social Media</span>
          </div>
        </header>

        <main className="container mx-auto">
          {/* Render child routes */}
          <Outlet />
        </main>

        <footer className="bg-black text-white py-4 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} User Authentication App. All
              rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
};

export default App;

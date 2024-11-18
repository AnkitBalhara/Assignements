import React from 'react';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">User Authentication App</h1>
        </div>
      </header>

      <main className="container mx-auto ">
        {/* The Outlet component will render the child components based on the route */}
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} User Authentication App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;

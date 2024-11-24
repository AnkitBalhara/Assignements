import React,{ useState } from 'react';
import { Outlet } from 'react-router-dom';
import Context from './context/Context';

const App = () => {
  const [email,setEmail] = useState("")
  return (
    <Context.Provider value={{email,setEmail}}>
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white py-4 shadow-md">
        <div className="container mx-auto px-4">
          <span className="text-2xl font-bold">Login Authentication App</span>
        </div>
      </header>

      <main className="container mx-auto ">
        {/* The Outlet component will render the child components based on the route */}
        <Outlet />
      </main>

      <footer className="bg-black text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} User Authentication App. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </Context.Provider>
  );
};

export default App;

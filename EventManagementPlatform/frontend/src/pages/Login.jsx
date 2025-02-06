import React from 'react'
  
const Login = () => (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-6 w-96 border shadow-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" className="border p-2 w-full mb-2" />
        <input type="password" placeholder="Password" className="border p-2 w-full mb-4" />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
      </div>
    </div>
  );
  
  export default Login;
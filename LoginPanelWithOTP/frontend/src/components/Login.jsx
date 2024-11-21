import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import Context from '../context/Context';

const Login = () => {
  const {email,setEmail} = useContext(Context)


  const handleNavigate=()=>{
    setEmail("")
  }
  return (
    <div className="flex items-center justify-center min-h-screen text-center bg-gray-800">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/" className="text-blue-500 hover:underline" onClick={handleNavigate} >
            Register here
          </Link>
        </p>
        <p className="mt-4 text-center text-gray-600">
          <Link to="/forgetpassword" className="text-blue-500 hover:underline">
            Forget Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

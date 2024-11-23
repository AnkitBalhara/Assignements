import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Ensure Link is imported
import Context from "../context/Context";
import axios from "axios";

const Login = () => {
  const { email, setEmail } = useContext(Context);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        { email, password },{ withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/profile");
        setMessage("");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // console.log(error.response)
        setMessage(`${error.response.data.message}`);
      } else {
        // console.error("An error occurred:", error.message);
        setMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleNavigate = () => {
    setEmail("");
  };
  return (
    <div className="flex items-center justify-center min-h-screen text-center bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/"
            className="text-blue-500 hover:underline"
            onClick={handleNavigate}
          >
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

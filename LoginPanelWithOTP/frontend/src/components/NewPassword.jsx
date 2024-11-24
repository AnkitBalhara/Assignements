import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { email } = useContext(Context);
  const navigate = useNavigate();

  const handleNewPassword = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      return setMessage("Password & Confirm Password should be same");
    }
    if (password.length < 6) {
      setMessage("Password length must be at least 6 characters");
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setMessage("Password must include a special character");
      return false;
    }

    try {
      const response = await axios.post("http://localhost:8000/new-password", {
        email,
        password,
      });
      if (response.status == 200) {
        alert("Password Updated successfully");
        navigate("/login");
        return;
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage("Something Went wrong. Please try again!");
      } else {
        setMessage("Something Went wrong. Please try again!");
        console.error("An error occurred:", error.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">New Password</h2>
        <form onSubmit={handleNewPassword} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter New Password"
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Update Password
          </button>
        </form>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default NewPassword;

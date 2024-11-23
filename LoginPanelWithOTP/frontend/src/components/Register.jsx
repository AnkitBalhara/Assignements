import React, { useContext, useState } from "react";
import axios from "axios";
import VerifyOTP from "./VerifyOTP";
import { Link } from "react-router-dom";
import Context from "../context/Context";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const { email, setEmail } = useContext(Context);
  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Validate form inputs
  const validateForm = () => {
    if (formData.name.trim().length < 3) {
      alert("Name must be at least 3 characters long");
      return false;
    }
    if (email.trim().length === 0 || !email.includes("@")) {
      alert("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setMessage("Password length must be at least 6 characters");
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      setMessage("Password must include a special character");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post("http://localhost:8000/register", {
        name: formData.name,
        email,
        password: formData.password,
      });
      setMessage(response.data.message);
      setIsPopupOpen(true); // Show OTP popup
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  // Handle OTP popup close
  const handleCancelOtp = async () => {
    setIsPopupOpen(false);
    setMessage("");
    try {
      await axios.post("http://localhost:8000/cancel-otp", { email });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-center bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Register
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("success") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>

      {/* OTP Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <VerifyOTP />
            <button
              onClick={handleCancelOtp}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &#x2715;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";

const VerifyOTP = () => {
  const { email, setEmail } = useContext(Context);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isRegenerateDisabled, setIsRegenerateDisabled] = useState(true); // Button initially disabled
  const navigate = useNavigate();

  useEffect(() => {
    // Disable the button for 30 seconds when the component mounts
    const timer = setTimeout(() => {
      setIsRegenerateDisabled(false);
    }, 30000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/verify-otp", {
        email,
        otp,
      });
      setMessage(response.data.message);
      if (response.status === 200) {
        setEmail("");
        navigate("/login");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid or expired OTP.");
    }
  };

  const handleRegenerateOTP = async () => {
    console.log("Regenerate OTP clicked");
    setIsRegenerateDisabled(true); // Disable the button after clicking
    setTimeout(() => {
      setIsRegenerateDisabled(false); // Enable it again after 30 seconds
    }, 30000);

    // Your OTP regeneration logic here
    // Example:
    const response = await axios.post("http://localhost:8000/regenerate-otp", {
      email,
    });
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Verify OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Verify OTP
          </button>
        </form>

        <button
          onClick={handleRegenerateOTP}
          disabled={isRegenerateDisabled}
          className={`w-full py-2 mt-3 font-bold rounded-lg focus:outline-none ${
            isRegenerateDisabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-orange-400 text-white hover:bg-orange-500"
          }`}
        >
          Regenerate OTP
        </button>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyOTP;

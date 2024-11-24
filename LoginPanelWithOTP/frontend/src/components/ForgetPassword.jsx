import React, { useContext, useState } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewPassword from "./NewPassword";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { email, setEmail } = useContext(Context);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("Verify Account");
  const [btnText, setBtnText] = useState("Generate OTP");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleGenerateOTP = async (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      return alert("Enter Proper Email");
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/forget-password-otp",
        { email }
      );
      if (response.status == 200) {
        // console.log("Otp send Successfully");
      }
      setBtnText("Verify Account");
      setTitle("Ownership Verification");
    } catch (error) {
      // setMessage("Something went wrong!! Check Connection!!");
      console.log("error Occurred:- ", error.message);
      return alert (error.response.data.message)
    }
  };

  const handleVerifyAccount = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/forget-password-otp-match",
        {
          email,
          otp,
        }
      );
      if (response.status == 200) {
        // console.log("OTP Match");
        setIsPopupOpen(true);
      } 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
        console.log("OTP Doesn't match");
      } else {
        console.error("An error occurred:", error.message);
        return alert("OTP Doesn't match");
      }
    }
  };

  const handleCancelNewPassword = async () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
            required
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              title == "Verify Account" ? "hidden" : "none:"
            } `}
            required
          />
          <button
            type="submit"
            onClick={
              btnText == "Generate OTP"
                ? handleGenerateOTP
                : handleVerifyAccount
            }
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            {btnText}
          </button>
        </form>

        <button
          onClick={() => {
            setEmail("")
            navigate("/login");
          }}
          className={
            "w-full py-2 mt-3 font-bold rounded-lg focus:outline-none bg-gray-300 text-gray-600 hover:bg-gray-500 hover:text-white"
          }
        >
          Cancel
        </button>

        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

      </div>


      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative">
            <NewPassword />
            <button
              onClick={handleCancelNewPassword} // Close the popup
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              &#x2715; {/* Close Icon */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;

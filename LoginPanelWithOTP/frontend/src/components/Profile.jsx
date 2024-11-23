import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from backend
    axios
      .get("http://localhost:8000/profile/fetch-data", { withCredentials: true })
      .then((response) => {
        console.log(first)
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        if (error.response?.status === 401) {
          navigate("/login"); // Redirect to login if not authorized
        }
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/logout", { withCredentials: true });
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      alert(error.response.data.message)
      console.error("Error during logout:", error);
      navigate("/login")
    }
  };

  // if (!user) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="text-gray-500 text-xl">Loading...</div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-[600px] relative">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          User Profile
        </h1>

        <div className="text-left">
          <p className="text-xl text-gray-600 mb-4">
            <strong className="text-gray-800">Name:</strong> 
          </p>
          <p className="text-xl text-gray-600">
            <strong className="text-gray-800">Email:</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

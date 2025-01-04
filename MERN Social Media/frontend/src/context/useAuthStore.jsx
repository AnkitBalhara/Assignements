import React, { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [message,setMessage] = useState("")
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      setAuthUser(res.data);
    } catch (error) {
      console.error("Error in Check Auth", error);
      setAuthUser(null);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  const signUp = async (name,email,password)=>{
    try {
      const res = await axiosInstance("/auth/signup",{fullName:name,email,password})
      setMessage(res.data.message)
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isCheckingAuth,
        checkAuth,
        signUp
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// SignUpPage.jsx

import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuthStore.jsx";

const SignUpPage = () => {
  const { signUp, message } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [redirectToLogin, setRedirectToLogin] = useState(false); // Redirect state

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form inputs
  const validateForm = () => {
    if (formData.name.trim().length < 3) {
      setErrorMessage("Name must be at least 3 characters long");
      return false;
    }
    if (formData.email.trim().length === 0 || !formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password length must be at least 6 characters");
      return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      setErrorMessage("Password must include a special character");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return false;
    }
    setErrorMessage(""); // Clear error message if validation passes
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = await signUp(formData.name, formData.email, formData.password);

    if (result) {
      // On successful signup, redirect to the login page
      setRedirectToLogin(true);
      navigate("/login");  // This redirects to login page programmatically
    }
  };

  // If signup was successful, redirect to the login page
  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

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
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            SignUp
          </button>
        </form>

        {errorMessage && (
          <p className="mt-4 text-center text-red-500">{errorMessage}</p>
        )}
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
    </div>
  );
};

export default SignUpPage;



// import React, { useState } from "react";
// import { Link, Navigate } from "react-router-dom";
// import { useAuth } from "../context/useAuthStore.jsx";

// const SignUpPage = () => {
//   const { signUp } = useAuth();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [message, setMessage] = useState("");

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Validate form inputs
//   const validateForm = () => {
//     if (formData.name.trim().length < 3) {
//       alert("Name must be at least 3 characters long");
//       return false;
//     }
//     if (formData.email.trim().length === 0 || !formData.email.includes("@")) {
//       alert("Please enter a valid email address");
//       return false;
//     }
//     if (formData.password.length < 6) {
//       setMessage("Password length must be at least 6 characters");
//       return false;
//     }
//     if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
//       setMessage("Password must include a special character");
//       return false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       setMessage("Passwords do not match");
//       return false;
//     }
//     return true;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const result = await signUp(
//       formData.name,
//       formData.email,
//       formData.password
//     );
//     if (result) {
//       // Handle further actions after successful signup, if necessary
//       console.log("Registered Successfully")
//       Navigate("/login")
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen text-center bg-gray-200">
//       <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-gray-700 mb-4">Sign Up</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             name="confirmPassword"
//             placeholder="Confirm Password"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none"
//           >
//             SignUp
//           </button>
//         </form>

//         {message && (
//           <p
//             className={`mt-4 text-center ${
//               message.includes("success") ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//         <p className="mt-4 text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-500 hover:underline">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;

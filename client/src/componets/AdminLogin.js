import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  // State variables to manage email and password inputs
  const [email, setEmail] = useState(""); // Stores the email input
  const [password, setPassword] = useState(""); // Stores the password input

  // useNavigate hook from React Router for programmatic navigation
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form behavior (page refresh)
    try {
      // Send a POST request to the backend for admin login
      const response = await fetch("http://127.0.0.1:5000/admin/login", {
        method: "POST", // HTTP method
        headers: { "Content-Type": "application/json" }, // JSON content type
        body: JSON.stringify({ email, password }), // Request body with email and password
      });

      const data = await response.json(); // Parse the response from the backend

      if (response.status === 200) {
        // If login is successful
        alert("Login Successful!"); // Show success alert
        navigate("/admin/add-question"); // Redirect to the add question page
      } else {
        // If login fails
        alert("Login Unsuccessful!"); // Show failure alert
      }
    } catch (error) {
      // Catch and handle any errors
      alert("Something went wrong. Please try again."); // Show error alert
    }
  };

  // Render the admin login form
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Container for the login form */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Admin Login
        </h2>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              value={email} // Bind input value to state
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
              required // Make field mandatory
            />
          </div>

          {/* Password field */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              value={password} // Bind input value to state
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              required // Make field mandatory
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

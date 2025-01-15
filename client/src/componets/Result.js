import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate(); // Hook to navigate to another route
  const [name, setName] = useState(""); // State to store the user's name
  const location = useLocation(); // Hook to access the location object for route state
  const { score } = location.state || {}; // Retrieve the score from the route state
  const { genre } = location.state || "Random"; // Retrieve the genre from props

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Ensure 'total' is included
    const total = location.state?.total || 0;
  
    // Send score, name, genre, and total to the backend API
    const response = await fetch("http://127.0.0.1:5000/result", {
      method: "POST", // Method is POST
      headers: {
        "Content-Type": "application/json", // Sending JSON data
      },
      body: JSON.stringify({ score, name, genre, total }), // Convert score, name, genre, and total to JSON string
    });
  
    // Check the response status
    if (response.ok) {
      // Redirect to the home page after submitting
      navigate("/"); // Navigate back to the home page
    } else {
      console.error("Failed to submit results");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <div className="result-container max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Display the final score */}
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Quiz Results
        </h2>
        <p className="text-lg mb-4 text-center text-black">
          Your final score is: {score}
        </p>

        {/* Form for entering user's name */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold">
              Enter your name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Update name on input change
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              required // Make this field required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Results;

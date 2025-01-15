import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  // useNavigate hook from React Router for programmatic navigation
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black">
      {/* Page title */}
      <h1 className="text-6xl font-bold mb-10">Quiz App</h1>

      {/* Button container */}
      <div className="flex space-x-6">
        {/* Button to navigate to the Quiz page */}
        <button
          onClick={() => navigate("/genres")} // Navigate to the quiz route when clicked
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Take A Quiz
        </button>

        {/* Button to navigate to the View Scores page */}
        <button
          onClick={() => navigate("/view-scores")} // Navigate to the view-scores route when clicked
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          View Top Scores
        </button>
      </div>
    </div>
  );
}

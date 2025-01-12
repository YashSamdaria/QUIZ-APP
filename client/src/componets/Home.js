import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black">
      <h1 className="text-6xl font-bold mb-10">Quiz App</h1>
      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/quiz")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Take A Quiz
        </button>
        <button
          onClick={() => navigate("/view-scores")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          View Top Scores
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";

const ViewScores = () => {
  const [userScores, setUserScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/view-score", {
          method: "GET",
        });
        const data = await response.json();
        setUserScores(data); // Store fetched scores in state
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching scores: ", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Top User Scores : </h1>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-6 text-left">Position</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Score</th>
          </tr>
        </thead>
        <tbody>
          {userScores.map((user, index) => (
            <tr
              key={index}
              className={"border-b bg-gray-200"}
            >
              <td className="py-3 px-6">{index+1}</td>
              <td className="py-3 px-6">{user.name}</td>
              <td className="py-3 px-6">{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewScores;

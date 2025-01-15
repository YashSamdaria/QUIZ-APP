import React, { useState, useEffect } from "react";

const ViewScores = () => {
  const [userScores, setUserScores] = useState([]); // State to store the list of user scores
  const [genres, setGenres] = useState([]); // State to store the list of genres
  const [selectedGenre, setSelectedGenre] = useState(""); // State for the selected genre
  const [loading, setLoading] = useState(true); // State to track loading state

  // Fetch genres from the backend when the component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/genres", {
          method: "GET",
        });
        const data = await response.json();
        if (Array.isArray(data.genres)) {
          setGenres(data.genres);
          setSelectedGenre(data.genres[0]); // Default to the first genre
        }
      } catch (error) {
        console.error("Error fetching genres: ", error);
      }
    };

    fetchGenres();
  }, []);

  // Fetch scores based on the selected genre
  useEffect(() => {
    if (!selectedGenre) return; // Return early if no genre is selected

    const fetchScores = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        // Fetch the user scores from the backend
        const response = await fetch(`http://127.0.0.1:5000/view-score`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch scores.");
        }

        const data = await response.json();
        setUserScores(data); // Store the scores in the state
      } catch (error) {
        console.error("Error fetching scores: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchScores();
  }, [selectedGenre]); // The hook will rerun if selectedGenre changes

  // Show loading message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  // Render scores table once data is fetched
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Top User Scores :</h1>

      {/* Dropdown for selecting genre */}
      <div className="mb-6 text-center">
        <label htmlFor="genre" className="font-semibold text-lg mr-4">
          Select Genre:
        </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="py-2 px-4 border border-gray-300 rounded-lg"
        >
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Table for scores */}
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
            <tr key={index} className={"border-b bg-gray-200"}>
              <td className="py-3 px-6">{index + 1}</td>
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

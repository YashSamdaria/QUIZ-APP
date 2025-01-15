import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export default function GenreQuizPage() {
  const [genres, setGenres] = useState([]); // State to store all available genres
  const [loading, setLoading] = useState(true); // State to handle loading
  const navigate = useNavigate(); // Hook for navigation

  // Fetch genres from the backend when the component mounts
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/genres"); // Replace with your actual API endpoint
        const data = await response.json();

        // Ensure data has the genres array
        if (Array.isArray(data.genres)) {
          setGenres(data.genres); // Set the genres if they exist
        } else {
          setGenres([]); // Set an empty array if no genres are available
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
        setGenres([]); // Ensure genres are set to empty if there's an error
      } finally {
        setLoading(false); // Set loading to false once API call is complete
      }
    };

    fetchGenres();
  }, []);

  // Handle genre button click
  const handleGenreClick = (genre) => {
    navigate(`/quiz`, { state: { genre: genre } }); // Pass genre as lowercase via state
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-10 bg-gray-100">
      <h1 className="text-3xl font-bold mt-9 mb-6">Available Genres</h1>

      {/* Display loading spinner while fetching genres */}
      {loading ? (
        <p className="text-gray-500">Loading genres...</p>
      ) : (
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          {/* Display the list of genres as buttons */}
          {genres.length > 0 ? (
            genres.map((genre, index) => (
              <button
                key={index}
                onClick={() => handleGenreClick(genre)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                {genre}
              </button>
            ))
          ) : (
            <p className="text-gray-500">No genres available</p>
          )}
        </div>
      )}
    </div>
  );
}

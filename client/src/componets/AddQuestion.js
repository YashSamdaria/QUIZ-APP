import React, { useState, useEffect } from "react";

export default function AddQuestion() {
  // State variables to store form inputs
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]); // State to store all existing genres
  const [newGenre, setNewGenre] = useState(""); // State to store a new genre input

  // Fetch existing genres from the backend
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/genres"); // Replace with your actual API endpoint
        const data = await response.json();
        if (data.genres) {
          setGenres(data.genres); // Set the genres to state
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Function to send the question data to the Flask backend
  const addQuestion = async (newQuestion) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/admin/add-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });
      const data = await response.json();
      console.log("Question added:", data);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      question,
      options: [optionA, optionB, optionC, optionD],
      correctAnswer,
      genre,
      date: new Date(),
    };

    addQuestion(newQuestion);

    console.log("Submitted Question:", newQuestion);

    // Clear the form
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectAnswer("");
    setGenre("");
  };

  // Function to handle adding a new genre
  const handleAddGenre = async () => {
    if (newGenre && !genres.includes(newGenre)) {
      try {
        const response = await fetch("http://127.0.0.1:5000/admin/add-genre", { // Endpoint for adding genre
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ genre: newGenre }),
        });
        const data = await response.json();
        if (data.message === "Genre added successfully") {
          setGenres([...genres, newGenre]); // Update genres list
          setNewGenre(""); // Clear the input
        }
      } catch (error) {
        console.error("Error adding genre:", error);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mt-9 mb-2">Add New Question</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Option A</label>
          <input
            type="text"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Option B</label>
          <input
            type="text"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Option C</label>
          <input
            type="text"
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Option D</label>
          <input
            type="text"
            value={optionD}
            onChange={(e) => setOptionD(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Correct Answer
          </label>
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Correct Answer</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Genre</label>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Genre</option>
            {genres.length > 0 &&
              genres.map((g, index) => (
                <option key={index} value={g}>
                  {g}
                </option>
              ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Add New Genre</label>
          <input
            type="text"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="button"
            onClick={handleAddGenre}
            className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Add Genre
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Question
        </button>
      </form>
    </div>
  );
}

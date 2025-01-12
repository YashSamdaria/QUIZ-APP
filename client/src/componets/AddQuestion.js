import React, { useState } from "react";

export default function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");

  // Send the data to Flask via a POST request
  const addQuestion = async (newQuestion) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/admin/add-question", {
        method: "POST", // Method is POST
        headers: {
          "Content-Type": "application/json", // Sending JSON data
        },
        body: JSON.stringify(newQuestion), // Convert JavaScript object to JSON string
      });

      const data = await response.json(); // Parse the response from the backend
      console.log("Question added:", data);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      options: [optionA, optionB, optionC, optionD],
      correctAnswer,
    };

	addQuestion(newQuestion)
    console.log("Submitted Question:", newQuestion);

    // Reset form
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectAnswer("");
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
          <label className="block text-gray-700 font-medium mb-2">
            Option A
          </label>
          <input
            type="text"
            value={optionA}
            onChange={(e) => setOptionA(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Option B
          </label>
          <input
            type="text"
            value={optionB}
            onChange={(e) => setOptionB(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Option C
          </label>
          <input
            type="text"
            value={optionC}
            onChange={(e) => setOptionC(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Option D
          </label>
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

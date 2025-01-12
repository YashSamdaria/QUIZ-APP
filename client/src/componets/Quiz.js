import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuizApp = () => {
  const [qlist, setQList] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);  // Track loading state

  const navigate = useNavigate(); // Hook to navigate to another route

  const answerMap = {
    0: "A",
    1: "B",
    2: "C",
    3: "D"
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/questions", {
          method: "GET",
        });
        const data = await response.json();
        setQList(data); // Store fetched questions in state
        setLoading(false);  // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching questions: ", error);
        setLoading(false);  // Set loading to false in case of error
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (index) => {
    const correctAnswer = qlist[currentQuestionIndex].correctAnswer;

    if (answerMap[index] === correctAnswer) {
      setScore(score + 1); // Increase score if answer is correct
    }

    // Move to the next question
    if (currentQuestionIndex < qlist.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Optionally redirect to another page (if required)
      navigate("/result",{ state: { score } }); // Use correct routing logic
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <div className="quiz-container max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Quiz App</h2>
        <p className="text-lg mb-4 text-center">Score: {score}</p>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <p className="text-center text-gray-500">Loading questions...</p>
          </div>
        ) : (
          <div className="card mb-6 p-4 border border-gray-300 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">
              {currentQuestionIndex + 1}) {qlist[currentQuestionIndex].question}
            </h3>
            <div className="options space-y-4">
              {qlist[currentQuestionIndex].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className="option-btn w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;

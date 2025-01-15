import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const QuizApp = () => {
  const [qlist, setQList] = useState([]);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { genre } = location.state || {};

  const answerMap = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!genre) {
        console.error("Genre is not provided. Redirecting...");
        navigate("/"); 
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:5000/${genre}/questions`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch questions.");
        }

        const data = await response.json();
        setQList(data);
      } catch (error) {
        console.error("Error fetching questions: ", error);
        navigate("/"); 
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [genre, navigate]);

  const handleAnswer = (index) => {
    // Access the correct answer for the current question
    const correctAnswer = qlist[currentQuestionIndex].correctAnswer;
    
    // Access the option selected by the user (based on index)
    const selectedAnswer = qlist[currentQuestionIndex].options[index];
  
    // Log to check values
    console.log("Correct Answer:", correctAnswer);
    console.log("Selected Answer:", selectedAnswer);
    
    // Update the score conditionally
    if (selectedAnswer === correctAnswer) {
      setScore((prevScore) => prevScore + 1); // Increment score if correct
    }
    
    // Move to the next question, or navigate to the result if it's the last question
    if (currentQuestionIndex < qlist.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Redirect to result page with the final score
      navigate("/result", { state: { score, total: qlist.length, genre } });
    }
  };
  
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-gray-500">Loading questions...</p>
      </div>
    );
  }

  if (!qlist.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-gray-500">No questions available for this genre.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <div className="quiz-container max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Quiz App</h2>
        <p className="text-lg mb-4 text-center">Score: {score}</p>

        <div className="card mb-6 p-4 border border-gray-300 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">
            {currentQuestionIndex + 1}) {qlist[currentQuestionIndex]?.question}
          </h3>

          <div className="options space-y-4">
            {qlist[currentQuestionIndex]?.options.map((option, idx) => (
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
      </div>
    </div>
  );
};

export default QuizApp;

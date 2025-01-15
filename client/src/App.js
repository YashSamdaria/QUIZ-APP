import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './componets/Home';
import Quiz from './componets/Quiz';
import ViewScores from './componets/ViewScores';
import AddQuestion from './componets/AddQuestion';
import Result from './componets/Result';
import Navbar from './componets/NavBar';
import AdminLogin from './componets/AdminLogin';
import GenreQuizPage from './componets/GenreQuizPage';

// Main App component
export default function App() {
  return (
    <>
      {/* Router wrapper that enables routing in the app */}
      <Router>
        {/* Navbar component that will appear on all pages */}
        <Navbar />
        
        {/* Define all the routes for the app */}
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />

          {/* Quiz route */}
          <Route path="/quiz" element={<Quiz />} />
          
          {/* Genre Quiz Option*/ }
          <Route path="/genres" element={<GenreQuizPage />} />
          
          {/* Admin login route */}
          <Route path="/adminlogin" element={<AdminLogin />} />

          {/* Admin add question route */}
          <Route path="/admin/add-question" element={<AddQuestion />} />

          {/* View top scores route */}
          <Route path="/view-scores" element={<ViewScores />} />

          {/* Result route */}
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </>
  );
}

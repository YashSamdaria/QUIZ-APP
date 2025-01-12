import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './componets/Home';
import Quiz from './componets/Quiz';
import ViewScores from './componets/ViewScores';
import AddQuestion from './componets/AddQuestion';
import Result from './componets/Result';
import Navbar from './componets/NavBar';
import AdminLogin from './componets/AdminLogin';


export default function App() {
  return (
   <>
  <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/add-question" element={<AddQuestion />} />
        <Route path="/view-scores" element={<ViewScores />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
   </>
  );
}

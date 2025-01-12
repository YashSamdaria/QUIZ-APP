import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
      <div className="text-2xl font-bold">BrainQuest</div>

      <div>
        <button
          onClick={() => navigate("/adminlogin")}
          className="py-2 px-4 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition"
        >
          Admin Control
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // useNavigate hook for navigation
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-md">
      {/* App Title */}
      <div className="text-2xl font-bold">BrainQuest</div>

      <div>
        {/* Button to navigate to Admin login */}
        <button
          onClick={() => navigate("/adminlogin")} // Navigate to admin login page when clicked
          className="py-2 px-4 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition"
        >
          Admin Control
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

// src/Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import './Home.css'; // Add custom CSS for styling

const Home = () => {
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Navigate to courses page
  const navigateToCourses = () => {
    navigate('/courses'); // Updatce navigation logic
  };

  return (
    <div className="home-container">
      <header>
        <h1>Welcome to the Course Repository</h1>
        <p>
          This is a simple course repository where you can view and manage courses.
          Add course information, upload syllabi, and stay organized.
        </p>
        <a href="https://github.com/your-repo-link" target="_blank" rel="noopener noreferrer">
          <button>Go to Repo</button>
        </a>
      </header>

      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for a file or content"
        />
      </div>

      <div className="file-upload">
        <input type="file" />
      </div>

      <div className="navigate-arrow" onClick={navigateToCourses}>
        <span>→</span> {/* Right arrow icon */}
      </div>
    </div>
  );
};

export default Home;

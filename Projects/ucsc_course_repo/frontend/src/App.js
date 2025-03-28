import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import CourseDetails from './courseDetails';
import Courses from './courses'; // New component for course listings

function App() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    name: '',
    professor: '',
    syllabus: null,
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:3002/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewCourse({ ...newCourse, syllabus: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newCourse.name);
    formData.append('professor', newCourse.professor);
    formData.append('syllabus', newCourse.syllabus);

    try {
      const response = await fetch('http://localhost:3002/courses', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.course) {
        setCourses([...courses, data.course]);
        setNewCourse({ name: '', professor: '', syllabus: null });
      }
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to the Course Repository</h1>
        </header>
        <div className="main-container">
          <aside className="sidebar">
            <h3>Filter/Search</h3>
            <input type="text" placeholder="Search courses..." />
          </aside>
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/courses"
                element={
                  <Courses
                    courses={courses}
                    newCourse={newCourse}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                  />
                }
              />
              <Route path="/courses/:id" element={<CourseDetails />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
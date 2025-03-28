import React from 'react';
import { useNavigate } from 'react-router-dom';

const Courses = ({ courses, newCourse, handleInputChange, handleFileChange, handleSubmit }) => {
  const navigate = useNavigate(); // useNavigate is now used inside a child component

  return (
    <>
      <h2>Course Listings</h2>
      <div className="course-cards">
        {courses.length === 0 ? (
          <p>No courses available. Add a new course below.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => navigate(`/courses/${course.id}`)} // Use navigate here
            >
              <h3>{course.name}</h3>
              <p>Professor: {course.professor}</p>
            </div>
          ))
        )}
      </div>
      <h3>Upload Section</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Course Name"
          value={newCourse.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="professor"
          placeholder="Professor"
          value={newCourse.professor}
          onChange={handleInputChange}
          required
        />
        <label>
          <input
            type="file"
            name="syllabus"
            onChange={handleFileChange}
            required
          />
        </label>
        <button type="submit">Add Course</button>
      </form>
    </>
  );
};

export default Courses;

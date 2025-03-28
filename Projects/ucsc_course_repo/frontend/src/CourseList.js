// CourseList.js
import React, { useEffect, useState } from "react";
import { fetchCourses } from "./api";

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getCourses();
  }, []);

  return (
    <div>
      <h2>Course List</h2>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.name} - {course.professor}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CourseList; // This is a default export

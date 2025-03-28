// api.js
const API_URL = "http://localhost:3000/courses";

export const fetchCourses = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
};

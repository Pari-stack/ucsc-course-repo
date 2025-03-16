const express = require('express');
const app = express();
const port = 3000;
const pool = require("./db");


app.use(express.json()); // Middleware to parse JSON

let dataStore = []; // Temporary course storage

// GET all courses
app.get("/courses", async (req, res) => {
    try {
      const result = await pool.query("SELECT * FROM courses");
      res.json(result.rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });
  

// POST: Add a new course
app.post('/courses', (req, res) => {
    const newCourse = { id: dataStore.length + 1, ...req.body }; // Assign an ID
    dataStore.push(newCourse);
    res.json({ message: 'Course added', course: newCourse });
});

// PUT: Update a course by ID
app.put('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const index = dataStore.findIndex(course => course.id === courseId);
    
    if (index === -1) {
        return res.status(404).json({ message: 'Course not found' });
    }

    dataStore[index] = { ...dataStore[index], ...req.body }; // Merge updates
    res.json({ message: 'Course updated', course: dataStore[index] });
});

// DELETE: Remove a course by ID
app.delete('/courses/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const index = dataStore.findIndex(course => course.id === courseId);
    
    if (index === -1) {
        return res.status(404).json({ message: 'Course not found' });
    }

    dataStore.splice(index, 1);
    res.json({ message: 'Course deleted' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

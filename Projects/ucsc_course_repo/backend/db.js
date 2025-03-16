const { Pool } = require("pg");

// Create a connection pool
const pool = new Pool({
  user: "zhouweiwei",    // Replace with your PostgreSQL username
  host: "localhost",
  database: "course_repo",  // Use the database name you created
  password: "godofcrow", // Replace with your password
  port: 5432,              // Default PostgreSQL port
});

// Test the connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Connection error", err));

module.exports = pool;

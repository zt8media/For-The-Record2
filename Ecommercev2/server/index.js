const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config(); // Load environment variables

// Middleware
app.use(cors({
  origin: 'http://localhost:5173' // Replace with your frontend URL
}));
app.use(express.json());

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, '../dist')));

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT, // Use `port` instead of `database`
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../dist')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Get all records
app.get('/records', (req, res) => {
  console.log('GET /records');
  const query = 'SELECT * FROM vinyl_records';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// All other requests should return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

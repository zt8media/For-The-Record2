const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config(); // Load environment variables

// Middleware
app.use(cors());
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

// Add a new record
app.post('/records', (req, res) => {
  console.log('POST /records', req.body);
  const { artist_name, album_title, genre, year, description, price, stock_quantity, image_url } = req.body;
  const query = 'INSERT INTO vinyl_records (artist_name, album_title, genre, year, description, price, stock_quantity, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [artist_name, album_title, genre, year, description, price, stock_quantity, image_url], (err, results) => {
    if (err) {
      console.error('Error adding record:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, artist_name, album_title, genre, year, description, price, stock_quantity, image_url });
  });
});

// Update an existing record
app.put('/records/:id', (req, res) => {
  console.log('PUT /records/:id', req.params, req.body);
  const { id } = req.params;
  const { artist_name, album_title, genre, year, description, price, stock_quantity, image_url } = req.body;
  const query = 'UPDATE vinyl_records SET artist_name = ?, album_title = ?, genre = ?, year = ?, description = ?, price = ?, stock_quantity = ?, image_url = ? WHERE record_id = ?';
  db.query(query, [artist_name, album_title, genre, year, description, price, stock_quantity, image_url, id], (err, results) => {
    if (err) {
      console.error('Error updating record:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Record updated successfully' });
  });
});

// Delete a record
app.delete('/records/:id', (req, res) => {
  console.log('DELETE /records/:id', req.params);
  const { id } = req.params;
  const query = 'DELETE FROM vinyl_records WHERE record_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting record:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Record deleted successfully' });
  });
});

// All other requests should return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

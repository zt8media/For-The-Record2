const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use('/public', express.static(path.join(__dirname, '../public')));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'password', // Your MySQL password
  database: 'ecommerce',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../Ecommercev2/dist')));

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Records API');
});

// Get all records
app.get('/records', (req, res) => {
  const query = 'SELECT * FROM records';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Add a new record
app.post('/records', (req, res) => {
  const { title, artist, genre, release_year, price, image_url } = req.body;
  const query = 'INSERT INTO records (title, artist, genre, release_year, price, image_url) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [title, artist, genre, release_year, price, image_url], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, title, artist, genre, release_year, price, image_url });
  });
});

// Update an existing record
app.put('/records/:id', (req, res) => {
  const { id } = req.params;
  const { title, artist, genre, release_year, price, image_url } = req.body;
  const query = 'UPDATE records SET title = ?, artist = ?, genre = ?, release_year = ?, price = ?, image_url = ? WHERE id = ?';
  db.query(query, [title, artist, genre, release_year, price, image_url, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Record updated successfully' });
  });
});

// Delete a record
app.delete('/records/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM records WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Record deleted successfully' });
  });
});

// All other requests should return the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../Ecommercev2/dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config({ path: path.join(__dirname, '.env') });

const corsOptions = {
  origin: ['http://localhost:5173', 'https://for-the-record.onrender.com'],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/records', (req, res) => {
  console.log('GET /records request received');
  const query = 'SELECT * FROM vinyl_records';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      return res.status(500).json({ error: err.message });
    }
    console.log('Records fetched successfully:', results);
    res.json(results);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

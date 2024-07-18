const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'sql5.freesqldatabase.com',
  user: 'sql5720646',
  password: 'I7k9RAAifv',
  database: 'sql5720646',
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');

  const query = 'SELECT * FROM vinyl_records';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching records:', err);
      return;
    }
    console.log('Records:', results);
    db.end();
  });
});

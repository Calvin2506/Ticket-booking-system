// search_functionality.js

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// Create an instance of Express
const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.json());

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'travel_booking_system'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + db.threadId);
});

// API endpoint for searching accommodations
app.get('/api/search', (req, res) => {
  const { destination, checkInDate, checkOutDate } = req.query;

  // Logic for searching accommodations based on destination and dates
  db.query('SELECT * FROM accommodations WHERE name = ? AND price <= ?',
    [destination, checkOutDate],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

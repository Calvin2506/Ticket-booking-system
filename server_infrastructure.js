// server_infrastructure.js

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

// API endpoints for handling requests
app.get('/api/bookings', (req, res) => {
  // Logic for retrieving bookings from the database
  db.query('SELECT * FROM bookings', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/bookings', (req, res) => {
  // Logic for creating a new booking in the database
  const newBooking = req.body;
  db.query('INSERT INTO bookings SET ?', newBooking, (err, result) => {
    if (err) throw err;
    res.send('Booking created successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


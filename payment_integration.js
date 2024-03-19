// payment_integration.js

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

// Payment processing endpoint
app.post('/api/payments', (req, res) => {
  // Logic for processing payment and updating payment status
  const newPayment = req.body;
  db.query('INSERT INTO payments SET ?', newPayment, (err, result) => {
    if (err) throw err;
    // Update booking status to 'Paid'
    db.query('UPDATE bookings SET payment_status = "Paid" WHERE booking_id = ?', newPayment.booking_id, (err, result) => {
      if (err) throw err;
      res.send('Payment processed successfully');
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


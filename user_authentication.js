// user_authentication.js

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

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

// User registration endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password before storing it in the database
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;

    const newUser = { username, email, password: hash };
    db.query('INSERT INTO users SET ?', newUser, (err, result) => {
      if (err) throw err;
      res.send('User registered successfully');
    });
  });
});

// User login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', email, (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;

        if (result) {
          res.send('Login successful');
        } else {
          res.status(401).send('Invalid email or password');
        }
      });
    } else {
      res.status(401).send('User not found');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


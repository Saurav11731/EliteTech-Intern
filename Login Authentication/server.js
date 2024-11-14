const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const crypto = require('crypto');

// Load environment variables
dotenv.config();

// Generate a secure secret key (only needs to be done once, then store it in .env)
const secretKey = process.env.SESSION_SECRET || crypto.randomBytes(64).toString('hex');
console.log("Your session secret key is:", secretKey);

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Session setup
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost', // Or your MySQL host
  user: 'root',      // Your MySQL user
  password: '@SY111162a',      // Your MySQL password
  database: 'loginAuthDB'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to serve the registration page
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route to serve the login page
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

// Route to serve the dashboard page (secured)
app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.sendFile(__dirname + '/public/dashboard.html');
});

// Register route (handles registration form submission)
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.send('Error while checking user');
    }
    if (results.length > 0) {
      return res.send('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to DB
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
      if (err) {
        return res.send('Error while registering user');
      }
      res.redirect('/login');
    });
  });
});

// Login route (handles login form submission)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if user exists
  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
      return res.send('Error while checking user');
    }
    if (results.length === 0) {
      return res.send('Invalid username or password');
    }

    const user = results[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send('Invalid username or password');
    }

    // Set session
    req.session.user = user;
    res.redirect('/dashboard');
  });
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send('Error while logging out');
    }
    res.redirect('/login');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

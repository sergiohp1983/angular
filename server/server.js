const express = require("express");
const cors = require("cors");

const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to nbvisitor application." });
});

app.post('/api/login',async (req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if(rows.length === 0) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if(!isPasswordValid) { 
          return res.status(401).json({ message: 'Invalid password'});
        }

        const token = jwt.sign({ userId : user.id, username: user.username}, SECRET_KEY, {
          expiresIn : '1h'
        });

        res.status(201).json({ message: 'Login successful', token });
        
    } 
    catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/api/register', async(req, res) => {
  const { username, password, role_id, created_at} = req.body;
  console.log('Register request body: username: ' + username + ', password: ' + password + ', role_id: ' + role_id + ', created_at: ' + created_at);

  try {

    if (!username || !password || !role_id || !created_at) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);

    if(existing.length > 0) {
      return res.status(409).json({ message: 'Username already registered'});
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (username, password_hash, role_id, created_at) VALUES ( ?, ?, ?, ?)', 
      [username, passwordHash, role_id, created_at]);

    res.status(201).json({ message: 'User registered successfully'});  

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// server.js

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- 1. Database Connection (Replace with your connection string) ---
mongoose.connect('mongodb://localhost:27017/freecrashcourse')
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


// --- 2. Middleware Configuration ---

// Serve static files (CSS, images, client-side JS)
// Make sure your HTML, CSS (style.css, form.css) are in a folder named 'public'
app.use(express.static(path.join(__dirname, 'public'))); 

// Parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure Session Middleware
app.use(session({
    secret: 'aVerySecureSecretKeyForSessions', // Change this to a random string!
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));


// --- 3. Simple Routing for Static Pages ---

// Welcome/Home Page
app.get('/', (req, res) => {
    // Note: We are using res.sendFile() because your current index.html is static.
    // In a real app, you would use a template engine here (e.g., res.render('index', {...}))
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Login Page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Sign Up Page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});


// --- 4. Authentication Routes (To be implemented next) ---
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes); // All /auth/signup and /auth/login routes will be handled here.


// --- 5. Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// --- POST /auth/signup (Handles form submission from signup.html) ---
router.post('/signup', async (req, res) => {
    const { username, email, password, 'confirm-password': confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match.');
    }

    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User with this email already exists.');
        }

        // 2. Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create and save the new user
        user = new User({
            username,
            email,
            password: hashedPassword
        });
        await user.save();

        // Optional: Log the user in immediately
        req.session.userId = user._id;

        // Redirect to a dashboard or success page
        res.redirect('/dashboard'); 

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error during sign up.');
    }
});

// --- POST /auth/login (Handles form submission from login.html) ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('Invalid Credentials.');
        }

        // 2. Compare the plain text password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('Invalid Credentials.');
        }

        // 3. Successful login: Create a session
        req.session.userId = user._id;

        // Redirect to a dashboard
        res.redirect('/dashboard'); 

    } catch (err) {
        console.error(err);
        res.status(500).send('Server error during login.');
    }
});

module.exports = router;
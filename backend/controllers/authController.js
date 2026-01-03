const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    console.log('Register request body:', req.body); // Debug log

    if (!name || !email || !password) {
        console.log('Missing fields'); // Debug log
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists:', email); // Debug log
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

// @desc    Login with Google
// @route   POST /api/auth/google
// @access  Public
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, picture } = ticket.getPayload();

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10), // Random password
            });
        }

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(401).json({ message: 'Google authentication failed', error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    googleLogin,
    getMe,
};

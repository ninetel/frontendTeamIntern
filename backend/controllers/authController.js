const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user (admin, staff, normal users, clients)
exports.registerUser = async (req, res) => {
    const { name, email, password, phoneNumber, role } = req.body;

    if (!name || !email || !password || !phoneNumber || !role) {
        return res.status(400).json({ error: 'Name, email, password, phone number, and role are required' });
    }

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ name, email, phoneNumber, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Admin login
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, role: 'admin' });
        if (!user) return res.status(401).json({ error: 'Invalid email oar password' });
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid email odr password' });

        const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.cookie("token", token, {
        //     maxAge: 15 * 24 * 60 * 60 * 1000, //ms
        //     httpOnly: true,
        //     sameSite: "strict"
        // })
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

// Staff login
exports.staffLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, role: 'staff' });
        if (!user) return res.status(401).json({ error: 'Invalzid email or password' });
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalaid email or password' });

        const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.cookie("token", token, {
        //     maxAge: 15 * 24 * 60 * 60 * 1000, //ms
        //     httpOnly: true,
        //     sameSite: "strict"
        // })
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

// Common login for normal users and clients
exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid email or passfword' });
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: 'Invalid email or pasfsword' });

        const accessToken = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
};

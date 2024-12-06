const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        res.status(201).json({ id: user.id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Logowanie użytkownika
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ message: 'Login successful' });
});

module.exports = router;
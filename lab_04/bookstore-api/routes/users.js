const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const router = express.Router();

const SECRET_KEY = 'your_secret_key'; // Zmień na bardziej skomplikowany klucz

// Rejestracja użytkownika
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json({ id: user.id, email: user.email });
    } catch (err) {
        res.status(400).json({ error: 'User already exists or invalid data' });
    }
});

// Logowanie użytkownika
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, password } });
    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generowanie JWT
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
        expiresIn: '1h', // Token ważny przez 1 godzinę
    });

    res.json({ token });
});

module.exports = router;
const express = require('express');
const { Book } = require('../models');
const router = express.Router();

// Pobranie wszystkich książek
router.get('/', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

// Pobranie konkretnej książki
router.get('/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
});

// Dodanie nowej książki
router.post('/', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: 'Invalid data' });
    }
});

// Usunięcie książki
router.delete('/:id', async (req, res) => {
    const deleted = await Book.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Book not found' });
    res.status(204).send();
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { Book } = require('../models');

// Pobierz wszystkie książki
router.get('/', async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
});

// Pobierz książkę po ID
router.get('/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
});

// Dodaj książkę
router.post('/', async (req, res) => {
    const { title, author, year } = req.body;
    try {
        const book = await Book.create({ title, author, year });
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Usuń książkę
router.delete('/:id', async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    await book.destroy();
    res.json({ message: 'Book deleted' });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const { Order, Book } = require('../models');

// Pobierz zamówienia użytkownika
router.get('/:userId', async (req, res) => {
    const orders = await Order.findAll({ where: { userId: req.params.userId } });
    res.json(orders);
});

// Dodaj zamówienie
router.post('/', async (req, res) => {
    const { userId, bookId, quantity } = req.body;
    try {
        const book = await Book.findByPk(bookId);
        if (!book) return res.status(404).json({ error: 'Book not found' });

        const order = await Order.create({ userId, bookId, quantity });
        res.status(201).json(order);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Usuń zamówienie
router.delete('/:id', async (req, res) => {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    await order.destroy();
    res.json({ message: 'Order deleted' });
});

// Aktualizuj zamówienie (PATCH)
router.patch('/:id', async (req, res) => {
    const { quantity } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    order.quantity = quantity || order.quantity;
    await order.save();
    res.json(order);
});

module.exports = router;
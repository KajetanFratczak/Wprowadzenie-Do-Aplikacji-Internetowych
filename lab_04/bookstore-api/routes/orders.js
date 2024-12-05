const express = require('express');
const { Order, Book } = require('../models');
const router = express.Router();

// Pobranie wszystkich zamówień użytkownika
router.get('/:userId', async (req, res) => {
    const orders = await Order.findAll({ where: { userId: req.params.userId } });
    res.json(orders);
});

// Dodanie nowego zamówienia
router.post('/', async (req, res) => {
    const { userId, bookId, quantity } = req.body;

    // Sprawdzenie, czy książka istnieje
    const book = await Book.findByPk(bookId);
    if (!book) return res.status(404).json({ error: 'Book not found' });

    const order = await Order.create({ userId, bookId, quantity });
    res.status(201).json(order);
});

// Usunięcie zamówienia
router.delete('/:orderId', async (req, res) => {
    const deleted = await Order.destroy({ where: { id: req.params.orderId } });
    if (!deleted) return res.status(404).json({ error: 'Order not found' });
    res.status(204).send();
});

// Edycja zamówienia
router.patch('/:orderId', async (req, res) => {
    const { quantity } = req.body;

    const order = await Order.findByPk(req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (quantity) order.quantity = quantity;
    await order.save();
    res.json(order);
});

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const bookRoutes = require('./routes/books');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');

const app = express();

// Endpointy dla książek
app.use('/api/books', bookRoutes);

// Endpointy dla zamówień
app.use('/api/orders', orderRoutes);

// Endpointy dla użytkowników
app.use('/api/users', userRoutes);

// Endpoint główny
app.get('/', (req, res) => {
    res.send('Witamy w API księgarni!');
});

// Start serwera
const PORT = 3000;
sequelize.sync({ force: true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
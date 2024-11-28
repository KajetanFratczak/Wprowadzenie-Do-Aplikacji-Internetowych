const express = require('express'); //importowanie expressa 
const app = express(); //tworzymy aplikacje
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

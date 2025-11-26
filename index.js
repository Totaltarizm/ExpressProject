require('dotenv').config(); // Завантажує змінні з .env
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const MESSAGE = process.env.MESSAGE || "Hello World";

app.get('/', (req, res) => {
  res.send(MESSAGE);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

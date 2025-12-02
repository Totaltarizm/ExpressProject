require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require("./routes/users");

app.use(express.json());
app.use(express.static("public"));

// Підключення маршрутів
app.use("/api/users", userRoutes);

// --- Підключення до MongoDB ---
const mongoHost = process.env.MONGO_DB_HOSTNAME || 'mongodb';
const mongoPort = process.env.MONGO_DB_PORT || 27017;
const mongoDb   = process.env.MONGO_DB || 'usersdb';
const mongoUrl = `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`;

const connectWithRetry = () => {
  console.log('Спроба підключення до MongoDB...');
  mongoose.connect(mongoUrl)
    .then(() => {
      console.log('MongoDB підключено успішно!');
    })
    .catch(err => {
      console.error('Помилка підключення до MongoDB, повторна спроба через 5 секунд', err);
      setTimeout(connectWithRetry, 5000); // повтор через 5 секунд
    });
};

connectWithRetry();

// --- Запуск сервера ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущено на порту ${PORT}`));

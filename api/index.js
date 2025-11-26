require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();

app.use(express.json());
app.use(express.static("public"));

// Підключення до MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB підключено'))
    .catch(err => console.log(err));

// --- CRUD маршрути ---

// Отримати всіх користувачів
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Отримати одного користувача
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// Створити користувача
app.post('/api/users', async (req, res) => {
  const user = new User({ name: req.body.name, age: req.body.age });
  await user.save();
  res.json(user);
});

// Оновити користувача
app.put('/api/users', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.body.id,
    { name: req.body.name, age: req.body.age },
    { new: true }
  );
  res.json(user);
});

// Видалити користувача
app.delete('/api/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json(user);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущено на порту ${PORT}`));

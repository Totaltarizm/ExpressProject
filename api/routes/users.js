const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Отримати всіх користувачів
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Отримати одного користувача
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// Створити користувача
router.post('/', async (req, res) => {
  const user = new User({ name: req.body.name, age: req.body.age });
  await user.save();
  res.json(user);
});

// Оновити
router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, age: req.body.age },
    { new: true }
  );
  res.json(user);
});

// Видалити
router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json(user);
});

module.exports = router;

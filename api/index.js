require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // для твоего HTML файла

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// --- CRUD маршруты ---

// Получить всех пользователей
app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Получить одного пользователя по ID
app.get('/api/users/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
});

// Создать пользователя
app.post('/api/users', async (req, res) => {
    const user = new User({ name: req.body.name, age: req.body.age });
    await user.save();
    res.json(user);
});

// Изменить пользователя
app.put('/api/users', async (req, res) => {
    const user = await User.findByIdAndUpdate(
        req.body.id,
        { name: req.body.name, age: req.body.age },
        { new: true }
    );
    res.json(user);
});

// Удалить пользователя
app.delete('/api/users/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

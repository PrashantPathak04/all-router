const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: generateId } = require('uuid');
const usersData = require('../data/users');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

const router = express.Router();

// POST /auth/signup
router.post('/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: 'Email and password are required.' });
    }

    const users = await usersData.getAll();
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    const hashed = bcrypt.hashSync(password, 8);
    const user = { id: generateId(), email, password: hashed };
    await usersData.add(user);

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(201).json({ message: 'User created', userId: user.id, token });
  } catch (err) {
    next(err);
  }
});

// POST /auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ message: 'Email and password are required.' });
    }

    const users = await usersData.getAll();
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ message: 'Login successful', userId: user.id, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

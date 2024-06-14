const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Login | MongoDB conectado');
});

// Endpoint de login
// POST "auth/login" BODY { user, pwd }
router.post('/login', async (req, res) => {
  const { user, pwd } = req.body;
  try {
    const foundUser = await User.findOne({ user });
    if (!foundUser) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }
    const isMatch = await bcrypt.compare(pwd, foundUser.pwd);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }
    const token = jwt.sign({user: foundUser}, 'secret-key', { expiresIn: '12h' });
    res.json({ message: 'Login bem-sucedido', token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST "auth/validate" BODY { user, pwd }
router.post('/validate', async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  jwt.verify(authHeader, 'secret-key', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const userId = decoded.user._id;
    //console.log(userId);
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json({ message: 'Token válido', foundUser });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schemas/user');

mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Users | MongoDB conectado');
});

// Retornar todos os usuários
// GET "/users"
router.get('/', async (req, res) => {
  try {
    const foundedUser = await User.find();
    console.log('Objetos encontrados com sucesso!');
    res.status(200).json(foundedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Retornar um usuário específico
// GET /users/:pid
router.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const foundedUser = await User.findById( pid );
    console.log('Objeto encontrado com sucesso!');
    res.json({ message: 'Usuário encontrado com sucesso!', foundedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Alterar um usuário
// PUT "/users/:id" BODY { ... }
router.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const newUser = req.body;

  if (newUser.pwd) {
    const salt = await bcrypt.genSalt(10);
    newUser.pwd = await bcrypt.hash(newUser.pwd, salt);
  }

  //console.log(newUser);
  try {
    const updatedUser = await User.findByIdAndUpdate(pid, 
      { 
        name: newUser.name, 
        email: newUser.email,
        user: newUser.user,
        pwd: newUser.pwd,
        level: newUser.level,
        status: newUser.status,
      }, { new: true });
    //console.log('Objeto Atualizado:', updatedUser);
    res.json({ message: 'Usuário alterado com sucesso!', updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deletar um usuário
// DELETE "/users/:id"
router.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;
  try {
    const deletedUser = await User.findByIdAndDelete(pid);
    console.log('Objeto deletado:', deletedUser);
    res.json({ message: 'Usuário deletado com sucesso!', deletedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Registrar um novo usuário
// POST "/users" BODY { ... }
router.post('/register', async (req, res) => {
  const user = req.body;
  if (user.pwd) {
    const salt = await bcrypt.genSalt(10);
    user.pwd = await bcrypt.hash(user.pwd, salt);
  }
  console.log(user);
  try {
    const newUser = await User.create(user);
    console.log('Objeto salvo com sucesso!');
    res.json({ message: 'Usuário salvo com sucesso!', newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

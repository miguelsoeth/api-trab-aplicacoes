const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Accounts | MongoDB conectado');
});

const accountsSchema = new mongoose.Schema({
  description: String,
  comments: String
});

const Account = mongoose.model('Account', accountsSchema);

// Return all accounts
// GET "/accounts"
router.get('/', async (req, res) => {
  try {
    const accounts = await Account.find();
    console.log('Objects found successfully!');
    res.status(200).json(accounts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Return a specific account
// GET /accounts/:aid
router.get('/:aid', async (req, res) => {
  const aid = req.params.aid;
  try {
    const account = await Account.findById(aid);
    console.log('Object found successfully!');
    res.json({ message: 'Account found successfully!', account });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Insert a new account
// POST "/accounts" BODY { ... }
router.post('/', async (req, res) => {
  const accountData = req.body;
  console.log(accountData);
  try {
    const newAccount = await Account.create(accountData);
    console.log('Object saved successfully!');
    res.json({ message: 'Account saved successfully!', newAccount });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an account
// PUT "/accounts/:aid" BODY { ... }
router.put('/:aid', async (req, res) => {
  const aid = req.params.aid;
  const updatedAccountData = req.body;
  console.log(updatedAccountData);
  try {
    const updatedAccount = await Account.findByIdAndUpdate(aid, updatedAccountData, { new: true });
    console.log('Object Updated:', updatedAccount);
    res.json({ message: 'Account updated successfully!', updatedAccount });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an account
// DELETE "/accounts/:aid"
router.delete('/:aid', async (req, res) => {
  const aid = req.params.aid;
  try {
    const deletedAccount = await Account.findByIdAndDelete(aid);
    console.log('Object deleted:', deletedAccount);
    res.json({ message: 'Account deleted successfully!', deletedAccount });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

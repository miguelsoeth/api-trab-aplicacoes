const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Entry = require('../schemas/entry');

mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Entries | MongoDB conectado');
});

// Return all entries
// GET "/entries"
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find();
    console.log('Objects found successfully!');
    res.status(200).json(entries);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Return a specific entry
// GET /entries/:eid
router.get('/:eid', async (req, res) => {
  const eid = req.params.eid;
  try {
    const entry = await Entry.findById(eid);
    console.log('Object found successfully!');
    res.json({ message: 'Entry found successfully!', entry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Insert a new entry
// POST "/entries" BODY { ... }
router.post('/', async (req, res) => {
  const entryData = req.body;
  console.log(entryData);
  try {
    const newEntry = await Entry.create(entryData);
    console.log('Object saved successfully!');
    res.json({ message: 'Entry saved successfully!', newEntry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an entry
// PUT "/entries/:eid" BODY { ... }
router.put('/:eid', async (req, res) => {
  const eid = req.params.eid;
  const updatedEntryData = req.body;
  console.log(updatedEntryData);
  try {
    const updatedEntry = await Entry.findByIdAndUpdate(eid, updatedEntryData, { new: true });
    console.log('Object Updated:', updatedEntry);
    res.json({ message: 'Entry updated successfully!', updatedEntry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an entry
// DELETE "/entries/:eid"
router.delete('/:eid', async (req, res) => {
  const eid = req.params.eid;
  try {
    const deletedEntry = await Entry.findByIdAndDelete(eid);
    console.log('Object deleted:', deletedEntry);
    res.json({ message: 'Entry deleted successfully!', deletedEntry });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/bc', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Categories | MongoDB connected');
});

const categorySchema = new mongoose.Schema({
  description: String,
  type: String
});

const Category = mongoose.model('Category', categorySchema);

// Return all categories
// GET "/categories"
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    console.log('Objects found successfully!');
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Return a specific category
// GET /categories/:cid
router.get('/:cid', async (req, res) => {
  const cid = req.params.cid;
  try {
    const category = await Category.findById(cid);
    console.log('Object found successfully!');
    res.json({ message: 'Category found successfully!', category });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Insert a new category
// POST "/categories" BODY { ... }
router.post('/', async (req, res) => {
  const categoryData = req.body;
  console.log(categoryData);
  try {
    const newCategory = await Category.create(categoryData);
    console.log('Object saved successfully!');
    res.json({ message: 'Category saved successfully!', newCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a category
// PUT "/categories/:cid" BODY { ... }
router.put('/:cid', async (req, res) => {
  const cid = req.params.cid;
  const updatedCategoryData = req.body;
  console.log(updatedCategoryData);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(cid, updatedCategoryData, { new: true });
    console.log('Object Updated:', updatedCategory);
    res.json({ message: 'Category updated successfully!', updatedCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a category
// DELETE "/categories/:cid"
router.delete('/:cid', async (req, res) => {
  const cid = req.params.cid;
  try {
    const deletedCategory = await Category.findByIdAndDelete(cid);
    console.log('Object deleted:', deletedCategory);
    res.json({ message: 'Category deleted successfully!', deletedCategory });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;

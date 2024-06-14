const express = require('express')
const router = express.Router()
const users = require('./users')
const accounts = require('./accounts')
const categories = require('./categories')
const entries = require('./entries')
const auth = require('./auth')
const authMiddleware = require('../middlewares/authMiddleware');

router.use(express.json())
router.use('/users', authMiddleware, users)
router.use('/accounts', authMiddleware, accounts)
router.use('/categories', authMiddleware, categories)
router.use('/entries', authMiddleware, entries)
router.use('/auth', auth)

module.exports = router
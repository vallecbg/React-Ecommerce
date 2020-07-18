const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    createCategory,
    getAllCategories
} = require('../controllers/category')

router.post('/create', auth(), createCategory)

router.get('/all', auth(false), getAllCategories)

module.exports = router
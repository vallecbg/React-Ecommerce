const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    createCategory
} = require('../controllers/category')

router.post('/create', auth(), createCategory)

module.exports = router
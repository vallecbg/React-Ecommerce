const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    createProduct
} = require('../controllers/product')

router.post('/create', auth(), createProduct)

module.exports = router
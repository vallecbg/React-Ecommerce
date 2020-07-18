const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    createProduct,
    getAllProducts
} = require('../controllers/product')

router.post('/create', auth(), createProduct)

router.get('/all', auth(), getAllProducts)

module.exports = router
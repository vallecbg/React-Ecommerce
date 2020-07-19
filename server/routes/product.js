const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    createProduct,
    getAllProducts,
    getProduct
} = require('../controllers/product')

router.post('/create', auth(), createProduct)

router.get('/all', auth(false), getAllProducts)
router.get('/details/:id', auth(false), getProduct)

module.exports = router
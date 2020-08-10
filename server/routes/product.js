const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const {
    createProduct,
    getAllProducts,
    getProduct,
    editProduct,
    setDelete
} = require('../controllers/product')

//TODO: check if auth or admin
router.post('/create', auth(), createProduct)
router.post('/setDelete/:id', admin(), setDelete)

router.put('/edit/:id', admin(), editProduct)

router.get('/all', auth(false), getAllProducts)
router.get('/details/:id', auth(false), getProduct)

module.exports = router
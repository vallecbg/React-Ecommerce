const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    createOrder,
    getAllOrders
} = require('../controllers/order')

router.post('/create', auth(), createOrder)

router.get('/all', auth(), getAllOrders)

module.exports = router
const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const {
    createOrder,
    getAllOrders
} = require('../controllers/order')

router.post('/create', auth(), createOrder)

router.get('/all', admin(), getAllOrders)

module.exports = router
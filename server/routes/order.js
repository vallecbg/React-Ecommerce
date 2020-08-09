const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const {
    createOrder,
    getAllOrders,
    setStatus
} = require('../controllers/order')


//TODO: check if admin needed
router.get('/all', auth(), getAllOrders)

router.post('/create', auth(), createOrder)
router.post('/setStatus/:id', admin(), setStatus)

module.exports = router
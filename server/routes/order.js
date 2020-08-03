const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    createOrder
} = require('../controllers/order')

router.post('/create', auth(), createOrder)

module.exports = router
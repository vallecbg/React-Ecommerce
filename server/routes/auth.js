const express = require('express')
const router = express.Router()
const {
    login,
    register,
    logout
} = require('../controllers/auth')

router.post('/', login)
router.post('/register', register)

router.get('/logout', logout)

module.exports = router
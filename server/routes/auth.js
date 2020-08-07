const express = require('express')
const router = express.Router()
const {
    login,
    register,
    logout,
    edit
} = require('../controllers/auth')

router.post('/login', login)
router.post('/register', register)
router.post('/edit', edit)

router.get('/logout', logout)

module.exports = router
const express = require('express')
const router = express.Router()
const admin = require('../middlewares/admin')
const {
    createRole
} = require('../controllers/userRole')

router.post('/create', admin(), createRole)

module.exports = router
const express = require('express')
const router = express.Router()
const {
    getUser
} = require('../controllers/user')


router.get('/details/:id', getUser)

module.exports = router
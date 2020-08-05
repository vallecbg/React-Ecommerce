const express = require('express')
const router = express.Router()
const admin = require('../middlewares/admin')
const {
    getUser,
    getAll
} = require('../controllers/user')


router.get('/all', admin(), getAll)
//TODO: check should I add auth() middleware
router.get('/details/:id', getUser)

module.exports = router
const express = require('express')
const router = express.Router()
const admin = require('../middlewares/admin')
const {
    getUser,
    getAll,
    setRole
} = require('../controllers/user')


router.get('/all', admin(), getAll)
//TODO: check should I add auth() middleware
router.get('/details/:id', getUser)

router.post('/setRole/:id', admin(), setRole)

module.exports = router
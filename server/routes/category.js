const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const admin = require('../middlewares/admin')
const {
    createCategory,
    getAllCategories,
    getCategory,
    editCategory,
    deleteCategory
} = require('../controllers/category')

router.post('/create', auth(), createCategory)

router.put('/edit/:id', admin(), editCategory)
router.delete('/delete/:id', admin(), deleteCategory)

router.get('/all', auth(false), getAllCategories)
router.get('/details/:id', auth(), getCategory)

module.exports = router
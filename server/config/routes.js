const router = require('../routes')

module.exports = (app) => {
    app.use('/api/auth', router.auth)
    app.use('/api/product', router.product)
    app.use('*', (req, res, next) => {
        res.send('Route not found!')
    })
}
const router = require('../routes')

module.exports = (app) => {
    app.use('/api/auth', router.auth)
    //create app use for product create
    app.use('*', (req, res, next) => {
        res.send('Route not found!')
    })
}
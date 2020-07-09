const mongoose = require('mongoose')
const { dbUrl } = require('./config')

module.exports = () => {
    return mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
}
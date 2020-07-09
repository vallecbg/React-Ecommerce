const mongoose = require('mongoose')
const { String } = mongoose.Schema.Types

const removedTokenSchema = new mongoose.Schema({
    token: String
})

module.exports = mongoose.model('RemovedToken', removedTokenSchema)
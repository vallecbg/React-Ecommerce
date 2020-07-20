const mongoose = require('mongoose');
const { String } = mongoose.Schema.Types;

const userRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('UserRole', userRoleSchema);

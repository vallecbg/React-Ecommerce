const mongoose = require('mongoose');
const { String } = mongoose.Schema.Types;

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Category', categorySchema);

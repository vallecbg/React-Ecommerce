const mongoose = require('mongoose');
const { String, ObjectId } = mongoose.Schema.Types;

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    products: [{
        type: ObjectId,
        ref: "Product"
    }]
})

module.exports = mongoose.model('Category', categorySchema);

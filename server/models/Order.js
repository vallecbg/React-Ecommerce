const mongoose = require('mongoose');
const { String, ObjectId, Number } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                required: true
            }
        },
    ],
    creator: {
        type: ObjectId,
        ref: "User"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Order', orderSchema);

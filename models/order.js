// models/restaurant.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema({
    orderDate: { type: String, required: false },
    status: { type: String, required: false },
    products: [{
        provider: String,
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
    }]
});


const orderModel = mongoose.model('order', orderSchema)

module.exports = orderModel
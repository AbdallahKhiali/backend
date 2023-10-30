
// models/restaurant.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productName: { type: String, required: true },
    quantity: { type: Number },
});


const productModel = mongoose.model('product', productSchema)

module.exports = productModel
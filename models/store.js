// models/restaurant.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const storeSchema = new Schema({
        name: { type: String, required: true },
        location: { type: String, required: true },
    employees: [{ type: Schema.Types.ObjectId, ref: 'employee' }]
});


const storeModel = mongoose.model('store', storeSchema)

module.exports = storeModel
// models/employee.js
const mongoose = require('mongoose');
const storeModel = require('./store');

const { Schema } = mongoose;

const employeeSchema = new Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    adresse: { type: String, required: true },
    createdAt: Date,
    hourPay: Number,
    age: Number,
    position: { type: String, required: true },
    hourPay: { type: Number, required: true },


    store: { type: Schema.Types.ObjectId, ref: 'store' },
    //history of appointements 
    appointement: [{ type: Schema.Types.ObjectId, ref: 'appointement' }],

    //salary expected after reducing the late hours and absences and + shift hours  
    // salary: Number,
});



module.exports = mongoose.model('employee', employeeSchema);

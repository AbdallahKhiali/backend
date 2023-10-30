// models/employee.js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointementSchema = new Schema({

    day: { type: String },
    checkIn: { type: String },
    checkOut: { type: String },
    // in time / absent / late 
    status: { type: String, default: 'absent' },
    // daily pay
    hourPay: { type: Number },



    employee: { type: Schema.Types.ObjectId, ref: 'employee' }

});



module.exports = mongoose.model('appointement', appointementSchema);

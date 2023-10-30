
// models/restaurant.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // Hashed password
  role: { type: String, required: true },
  store: { type: Schema.Types.ObjectId, ref: 'Store' }, // Associate with a store
});


const userModel = mongoose.model('user', userSchema)

module.exports = userModel
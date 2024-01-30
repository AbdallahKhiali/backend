const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Référence à un modèle utilisateur 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }] // Reference to Comment model

});

module.exports = mongoose.model('post', postSchema);

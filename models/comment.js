const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Référence à un modèle utilisateur (si nécessaire)
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post', // Référence à un modèle post
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('comment', commentSchema);

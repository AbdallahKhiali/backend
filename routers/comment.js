const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

// Créer un commentaire pour un post
router.post('/', commentController.createComment);

// Récupérer les commentaires d'un post par ID
router.get('/post/:postId', commentController.getCommentsByPostId);
// poster un commentaire dans un post 
router.post('/post/:postId', commentController.getCommentsByPostId);

module.exports = router;

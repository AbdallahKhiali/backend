const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');

router.post('/', postController.createPost);

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPostById);

module.exports = router;

const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const verifylogin = require('../config/jwt');

router.post('/', verifylogin, postController.createPost);

router.get('/', verifylogin, postController.getAllPosts);

router.get('/:id', verifylogin, postController.getPostById);

module.exports = router;

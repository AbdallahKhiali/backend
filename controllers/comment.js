const commentModel = require('../models/comment');

exports.createComment = async (req, res) => {
    try {
        const { content, author, postId } = req.body;
        const comment = await commentModel.create({ content, author, post: postId });
        res.status(201).json({ success: true, data: comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erreur lors de la création du commentaire' });
    }
};

exports.getCommentsByPostId = async (req, res) => {
    try {
        const comments = await commentModel.find({ post: req.params.postId });
        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erreur lors de la récupération des commentaires' });
    }
};

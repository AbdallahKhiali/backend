const postModel = require('../models/post');

exports.createPost = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const post = await postModel.create({ title, content, author });
        res.status(201).json({ success: true, data: post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erreur lors de la création de la publication' });
    }
};


exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('comments');
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error fetching posts' });
    }
};


exports.getPostById = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id).populate('comments');
        if (!post) {
            return res.status(404).json({ success: false, error: 'Publication non trouvée' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Erreur lors de la récupération de la publication' });
    }
};

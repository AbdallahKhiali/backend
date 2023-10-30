const productModel = require('../models/product');

const jwt = require('jsonwebtoken');

// Create a new user

const createProduct = async (req, res) => {

    let product = new productModel({
        productName: req.body.productName,
        quantity: 0,
    })
    product.save().then(product => res.json({ message: 'product added successfully', product })).catch(err => res.json(err))

}




// Get a single user
const getProductById = (req, res) => {
    productModel.findById(req.params.id)
        .then(product => {
            if (!product) return res.status(404).json({ message: 'product not found' });
            res.json(product);
        })
        .catch(error => res.status(500).json({ message: error.message }));
}






// Get all users

const getProducts = (req, res) => {
    productModel.find()
        .then(product => res.json(product))
        .catch(error => res.status(500).json({ message: error.message }));
}


// // Update a user

// const updateUser = (req, res) => {
//     productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then(user => {
//             if (!user) return res.status(404).json({ message: 'User not found' });
//             res.json(user);
//         })
//         .catch(error => res.status(400).json({ message: error.message }));
// }

const deleteProduct = (req, res) => {
    // Delete a user
    productModel.findByIdAndRemove(req.params.id)
        .then(product => {
            if (!product) return res.status(404).json({ message: 'product not found' });
            res.json({ message: 'product deleted' });
        })
        .catch(error => res.status(500).json({ message: error.message }));

}






module.exports = {
    createProduct, getProductById, getProducts, deleteProduct
}
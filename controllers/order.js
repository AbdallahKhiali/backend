const orderModel = require('../models/order');

const jwt = require('jsonwebtoken');
const productModel = require('../models/product');

// Create a new user

const createOrder = async (req, res) => {

    const { products, orderDate } = req.body;

    let order = new orderModel({
        orderDate: orderDate || new Date().toISOString(),
        products: products,
    });

    const updateProducts = async () => {
        const updatedProducts = [];

        for (const element of products) {
            const { name, quantity } = element;

            try {
                const product = await productModel.findOne({ productName: name });

                if (!product) {
                    return res.json({ error: 'Product not found' });
                }

                // Update the product's quantity
                product.quantity = parseInt(product.quantity) + parseInt(quantity);

                // Save the updated product
                const updatedProduct = await product.save();
                updatedProducts.push(updatedProduct);
            } catch (error) {
                return res.status(500).json({ error: 'Internal server error', details: error.message });
            }
        }

        return updatedProducts;
    };

    updateProducts()
        .then((updatedProducts) => {
            order.save().then((order) =>
                res.json({ message: 'Order added successfully', order, updatedProducts })
            );
        })
        .catch((err) => res.status(500).json({ error: 'Internal server error', details: err.message }));

}




// Get a single user
const getOrderById = (req, res) => {
    orderModel.findById(req.params.id)
        .then(order => {
            if (!order) return res.status(404).json({ message: 'order not found' });
            res.json(order);
        })
        .catch(error => res.status(500).json({ message: error.message }));
}






// Get all users

const getOrders = (req, res) => {
    orderModel.find()
        .then(order => res.json(order))
        .catch(error => res.status(500).json({ message: error.message }));
}


// // Update a user

// const updateUser = (req, res) => {
//     orderModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then(user => {
//             if (!user) return res.status(404).json({ message: 'User not found' });
//             res.json(user);
//         })
//         .catch(error => res.status(400).json({ message: error.message }));
// }

const deleteOrder = (req, res) => {
    // Delete a user
    orderModel.findByIdAndRemove(req.params.id)
        .then(order => {
            if (!order) return res.status(404).json({ message: 'order not found' });
            res.json({ message: 'order deleted' });
        })
        .catch(error => res.status(500).json({ message: error.message }));

}






module.exports = {
    createOrder, getOrderById, getOrders, deleteOrder
}
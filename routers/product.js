const express = require('express')
const verifylogin = require('../config/jwt')

const {
    createProduct, getProductById, getProducts, deleteProduct
} = require('../controllers/product')

const productRouter = express.Router()

productRouter.get('/:id', getProductById)
productRouter.get('/', getProducts)
productRouter.delete('/:id', deleteProduct)

productRouter.post('/create', createProduct)


module.exports = productRouter
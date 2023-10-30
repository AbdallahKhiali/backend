const express = require('express')
const verifylogin = require('../config/jwt')

const { createOrder, getOrderById, getOrders, deleteOrder } = require('../controllers/order')

const orderRouter = express.Router()

orderRouter.get('/:id', getOrderById)
orderRouter.get('/', getOrders)
orderRouter.delete('/:id', deleteOrder)

orderRouter.post('/create', createOrder)


module.exports = orderRouter
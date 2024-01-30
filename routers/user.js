const express = require('express')
const verifylogin = require('../config/jwt')

const { createUser, login, getUserById,getUsers } = require('../controllers/user')

const userRouter = express.Router()

userRouter.get('/:id', verifylogin, getUserById)
userRouter.get('/', getUsers)
// userRouter.delete('/:id', verifylogin, deleteUser)
userRouter.post('/login',login)
userRouter.post('/signup', createUser)


module.exports = userRouter
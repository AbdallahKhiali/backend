const jwt = require('jsonwebtoken')
const userModel = require('../models/user')
require('dotenv').config()


// const secret = process.env.SECRET_KEY

const verifylogin = (req, res, next) => {

    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in" })
    }
    const token = authorization.replace('Bearer ', '')
    // TokenArray = jwttoken.split(" ");
    // const token = Jwt.decode(TokenArray[1])
    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged in" })
        }
        // console.log("payload:", payload)
        const { _id } = payload
        userModel.find({ _id }).then(userdata => {
            req.user = userdata
            next()
        })


    })
}

module.exports = verifylogin
const userModel = require('../models/user');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

// Create a new user

const createUser = async (req, res) => {

    userModel.findOne({ username: req.body.username }).then(
        (err, user) => {
            if (user) {
                res.json('user already exist')
            } else {
                const { username, password } = req.body
                bcrypt.hash(password, 16, (err, hash) => {
                    let user = new userModel({
                        username: username,
                        password: hash,
                    })
                    user.save().then(user => res.json({ message: 'user added successfully', user })).catch(err => res.json(err))
                })
            }
        }
    )
}








// Login a user
const login = (req, res) => {


    const { username, password } = req.body
    if (!username || !password) {
        return res.status(422).json({ error: "please add name or password" })
    }
    userModel.findOne({ username: username })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({message:"successfully signed in"})
                        const token = jwt.sign({ _id: savedUser._id }, process.env.SECRET_KEY, { expiresIn: "40m" })
                        const { _id, username } = savedUser
                        res.json({ token, user: { _id, username } })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid username or password" })
                    }
                })
                .catch(err => {
                    res.status(400).json({
                        error: err
                    });
                })
        })




};


// Get a single user
const getUserById = (req, res) => {
    userModel.findById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        })
        .catch(error => res.status(500).json({ message: error.message }));
}






// Get all users

const getUsers = (req, res) => {
    userModel.find()
        .then(users => res.json(users))
        .catch(error => res.status(500).json({ message: error.message }));
}


// // Update a user


// const updateUser = (req, res) => {
//     UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         .then(user => {
//             if (!user) return res.status(404).json({ message: 'User not found' });
//             res.json(user);
//         })
//         .catch(error => res.status(400).json({ message: error.message }));
// }

const deleteUser = (req, res) => {
    // Delete a user
    userModel.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json({ message: 'User deleted' });
        })
        .catch(error => res.status(500).json({ message: error.message }));

}






module.exports = {
    login, createUser, getUserById, getUsers, deleteUser
}
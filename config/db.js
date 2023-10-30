const mongoose = require('mongoose')
require('dotenv').config()

const Connection = async () => {
    mongoose.connect(process.env.DB_URI)
        .then(() => {
            console.log('Successfully connected to MongoDB Atlas!');
        })
        .catch((error) => {
            console.log('Unable to connect to MongoDB Atlas!');
            console.error(error);
        });

}


module.exports = Connection

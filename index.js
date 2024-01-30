const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const Connection = require('./config/db.js');
var cors = require('cors');
var mongoose = require("mongoose");


const userRouter = require('./routers/user.js');
const postRouter = require('./routers/post.js');
const commentRouter = require('./routers/comment.js');
var configData = require("./config/connection");


require('dotenv').config()

// Database
var connectionInfo = configData.getConnectionInfo();
mongoose.connect(connectionInfo.DATABASE_URL);


app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);





app.listen(process.env.PORT || 3001, () => {
    console.log(`the server listening on port ${process.env.PORT}...`)
})
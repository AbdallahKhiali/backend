const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Connection = require('./config/db.js');
var cors = require('cors');
var mongoose = require("mongoose");


const userRouter = require('./routers/user.js');
const postRouter = require('./routers/post.js');
const commentRouter = require('./routers/comment.js');


require('dotenv').config()


app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);





app.listen(process.env.PORT || 3001, () => {
    console.log(`the server listening on port ${process.env.PORT}...`)
})
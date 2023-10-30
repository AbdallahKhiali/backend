const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Connection = require('./config/db.js');
var cors = require('cors');

const employeeRouter = require('./routers/employee.js');
const storeRouter = require('./routers/store.js');
const userRouter = require('./routers/user.js');
const appointementRouter = require('./routers/appointement.js');
const orderRouter = require('./routers/order.js');
const productRouter = require('./routers/product.js');

require('dotenv').config()


Connection()

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())


app.use('/employee', employeeRouter);
app.use('/store', storeRouter);
app.use('/appointement', appointementRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);

app.use('/user', userRouter);





app.listen(process.env.PORT || 3001, () => {
    console.log(`the server listening on port ${process.env.PORT}...`)
})
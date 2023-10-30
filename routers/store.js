const express = require('express');

const storeRouter = express.Router();


const { getStores, getStoreById, createStore } = require('../controllers/store');



storeRouter.get('/', getStores)
storeRouter.get('/:id', getStoreById)
storeRouter.post('/create', createStore)



module.exports = storeRouter;  
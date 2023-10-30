const express = require('express');
const router = express.Router();
const storeModel = require('../models/store')

// Create a new store
const createStore = async (req, res) => {

  storeModel.findOne({ store: req.body.store }).then(
    (err, store) => {
      if (store) {
        res.json('store already exist')
      } else {
        const { name, location } = req.body
        let store = new storeModel({
          name: name,
          location: location,
        })

        store.save().then(store => res.json({ message: 'store added successfully', store })).catch(err => res.json(err))
      }
    }
  )

};

const getStores = async (req, res) => {
  try {
    const stores = await storeModel.find();
    res.json(stores);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Get a specific store by ID
const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.storeId);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

// Update a store by ID
const updateStore = async (req, res) => {
  try {
    const updatedStore = await Store.findByIdAndUpdate(
      req.params.storeId,
      req.body,
      { new: true }
    );
    if (!updatedStore) {
      return res.status(404).json({ error: 'Store not found' });
    }
    res.json(updatedStore);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}





module.exports = { getStores, getStoreById, createStore };

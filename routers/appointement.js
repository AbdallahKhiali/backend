const express = require('express');
const appointementRouter = express.Router();

const { getAppointementById, getAppointements, deleteAppointement, createAppointement } = require('../controllers/appointement')



appointementRouter.get('/:id', getAppointementById)
appointementRouter.get('/', getAppointements)
appointementRouter.delete('/:id', deleteAppointement)

appointementRouter.post('/create', createAppointement)




module.exports = appointementRouter;


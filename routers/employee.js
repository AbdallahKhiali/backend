const express = require('express');
const employeeRouter = express.Router();


const { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employee')



employeeRouter.get('/', getEmployees)

employeeRouter.delete('/:id', deleteEmployee)

employeeRouter.get('/:id', getEmployeeById)

employeeRouter.post('/create', createEmployee)

employeeRouter.put('/:id', updateEmployee)


module.exports = employeeRouter;  
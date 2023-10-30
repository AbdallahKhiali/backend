const employee = require("../models/employee");
const employeeModel = require("../models/employee");
const storeModel = require("../models/store");

// Create a new employee
const createEmployee = async (req, res) => {

    const { firstName, lastName, adresse, position, store, age, hourPay } = req.body
    let employee = new employeeModel({
        firstName: firstName,
        lastName: lastName,
        adresse: adresse,
        createdAt: new Date().getTime(),
        position: position,
        hourPay: hourPay,
        store: store,
        age: age
    })
    employee.save()
        .then(employee => storeModel.findByIdAndUpdate(store, { $push: { employees: employee } }, { new: true })
            .then(store => {
                if (!store) return res.status(404).json({ message: 'store not found' });
                res.json(store);
            })
            .catch(error => res.status(400).json({ message: error.message }))
        )
        .catch(err => res.json(err))

};

// Get all employees
const getEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find().populate({ path: 'store', select: 'name' }).populate('appointement');
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Get a specific employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const employee = await employeeModel.findById(req.params.id).populate('appointement').populate({ path: 'store', select: 'name' });
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

// Update an employee by ID
const updateEmployee = async (req, res) => {

    // const { id } = req.params.id
    // employeeModel.findByIdAndUpdate(id, req.body, { new: true },).then(
    //     () => {
    //         res.status(201).json({
    //             message: 'employee updated successfully!',
    //             data: req.body
    //         });
    //     }
    // ).catch(
    //     (error) => {
    //         res.status(400).json({
    //             error: error
    //         });
    //         console.log(error)
    //     }
    // );


    try {

        const updatedEmployee = await employeeModel.findByIdAndUpdate(
            req.params.id,
            { ...req.body, createdAt: new Date() }, // Update and set createdAt
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        res.status(201).json({
            message: 'Employee updated successfully!',
            data: updatedEmployee,
        });
    } catch (error) {
        res.status(400).json({
            error: error.message,
        });
    }



}

// Delete an employee by ID
const deleteEmployee = async (req, res) => {


    try {
        const employee = await employeeModel.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'User not found' });
        }


        // Find the store by ID
        const store = await storeModel.findById(employee.store._id);

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        // Remove the employee's reference from the store's employees array
        store.employees.pull(employee);

        // Save the updated store
        await store.save();

        // Remove the employee (this will trigger the pre middleware to update the store)
        await employeeModel.deleteOne({ _id: req.params.id });

        // Now you can send the success message
        res.json({ message: 'User deleted' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee };

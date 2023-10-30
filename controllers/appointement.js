// const fns = require('date-fns')
const appointementModel = require('../models/appointement');
const employeeModel = require('../models/employee');



const getAppointementById = async (req, res) => {
    const { id } = req.params
    appointementModel.findById(id).then((appointement) => res.json(appointement)).catch((err) => res.json({ err: err }))

}

const getAppointements = async (req, res) => {

    appointementModel.find().then((appointement) => res.json(appointement)).catch((err) => res.json({ err: err }))

}

// const createAppointement = async (req, res) => {

//     // Extract data from the request
//     const { employeeId, action } = req.body;

//     // Find the employee based on the card ID
//     const employee = await employeeModel.findById(employeeId);

//     if (!employee) {
//         return res.status(404).json({ error: 'Employee not found' });
//     }

//     try {

//         const now = new Date();
//         const openingTime = new Date();
//         const closingTime = new Date();
//         let status;


//         openingTime.setHours(7); // Adjust based on your closing time
//         closingTime.setHours(23); // Adjust based on your closing time



//         if (now < openingTime || now >= closingTime) {
//             return res.status(400).json({ error: 'Check-in or check-out is not allowed at this time.' });
//         }


//         else {


//             try {

//                 const existingAppointment = await appointementModel.findOne({
//                     employee: employee._id,
//                     day: now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear(),
//                 });

//                 if (action === 'check-in') {

//                     if (existingAppointment) {
//                         return res.status(400).json({ error: 'You have already checked in for today.' });
//                     }


//                     if (now < now.setHours(9)) {
//                         status = 'In time'; // Employee arrived before 9:00 AM
//                     } else if (now >= now.setHours(9) && now < closingTime) {
//                         status = 'Late'; // Employee arrived at or after 8:00 AM but before 4:00 PM
//                     } else {
//                         status = 'Absent'; // Employee didn't check in during working hours
//                     }


//                     console.log(status);

//                     const appointement = new appointementModel({
//                         day: now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear(),
//                         checkIn: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
//                         employee: employee._id,
//                         status: status, // i don't know how to get this status if he is late or in time ,
//                     });

//                     employee.appointement.push(appointement); // Push the appointement object to the employee's appointement array

//                     await employee.save(); // Save the updated employee document

//                     await appointement.save(); // Save the new appointement document

//                     res.json({ message: 'appointement recorded' });





//                 } else if (action === 'check-out' && existingAppointment.checkIn && !existingAppointment.checkOut) {

//                     // Set the clock-out logique 


//                     appointementModel.findByIdAndUpdate(existingAppointment._id, { checkOut: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() })
//                         .then(() => { res.json('Check out successfully') })
//                         .catch(err => { res.json({ err: err }) })

//                 } else {
//                     return res.status(400).json({ error: 'Invalid action' });
//                 }

//             } catch (error) {
//                 res.status(500).json({ error: error.message });
//             }
//         }

//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }


// }

const createAppointement = async (req, res) => {
    const { _id, action } = req.body;
    const employee = await employeeModel.findOne({ _id });

    if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
    }

    const now = new Date();

    // Automatically check out and in at midnight
    if (now.getHours() === 0) {
        // Find the last appointment and update the check-out time
        const lastAppointment = await appointementModel.findOne({ employee: employee._id }).sort({ day: -1 });

        if (lastAppointment && !lastAppointment.checkOut) {
            lastAppointment.checkOut = now;
            await lastAppointment.save();

            // Create a new appointment for the next day
            const newDay = new Date(now);
            newDay.setDate(newDay.getDate() + 1);
            const newAppointment = new appointementModel({ day: newDay, checkIn: now.getHours() + ':' + now.getMinutes() + ':' + now.getSecond(), employee: employee._id });
            await newAppointment.save();

            return res.json({ message: 'Checked out and in automatically at midnight' });
        }
    }

    if (action === 'check-in') {
        // Handle check-in logic

        const existingAppointment = await appointementModel.findOne({
            employee: employee._id,
            day: now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear(),
        });

        let status = 'in time'; // Default status

        if ((now.getHours() === 8 && now.getMinutes() > 5) || (now.getHours() > 8 && now.getHours() < 17)) {
            status = 'late';
        } else if (now.getHours() > 17 && now.getHours() < 23) { status = 'late'; } else status = 'absent'
        // Handle the logic for absent status, e.g., record absence or notify management



        if (!existingAppointment) {
            const pointage = new appointementModel({
                day: now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear(),
                checkIn: now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
                employee: employee._id,
                status: status,
            });

            employee.appointement.push(pointage); // Push the appointement object to the employee's appointement array

            await employee.save(); // Save the updated employee document

            await pointage.save();

            res.json({ message: 'Checked in' });

        } else {
            res.json({ error: 'You have already checked in for today.' });
        }
    } else if (action === 'check-out') {
        // Handle check-out logic
        const lastAppointment = await appointementModel.findOne({ employee: employee._id }).sort({ day: -1 });

        if (lastAppointment && !lastAppointment.checkOut) {
            lastAppointment.checkOut = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
            await lastAppointment.save();
            res.json({ message: 'Checked out' });
        } else {
            return res.status(400).json({ error: 'you need to check in first.' });
        }
    }
};


const deleteAppointement = async (req, res) => {
    appointementModel.findByIdAndRemove(req.params.id).then((appointement) => { res.json({ message: ' appointement removed ', appointement }) }).catch((err) => { res.json({ err: err }) })
}

module.exports = { getAppointementById, getAppointements, deleteAppointement, createAppointement }




const express = require('express');
const router = express.Router();
const controller = require('../controller/appoinmentBooking-controller');
const authMiddleware = require('../middleware/authmiddleware');

// Route to book an appointment
router.post('/book', authMiddleware, controller.bookAppoinment);
router.get('/',  controller.getPatientAppointments);

// Route to cancel an appointment
router.post('/cancel', authMiddleware, controller.cancelAppointment);

router.get('/patient/:patientId',  controller.getPatientAppointmentsById);
router.get('/doctor/:doctorId',  controller.getDoctorAppointmentsById);

// Route to reschedule an appointment
router.post('/reschedule', authMiddleware, controller.rescheduleAppointment);

// Route to get all appointments for a patient
router.get('/list', authMiddleware, controller.getPatientAppointments);

module.exports = router;
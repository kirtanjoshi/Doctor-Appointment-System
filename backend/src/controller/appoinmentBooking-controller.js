const BookingModel = require('../model/appoinmentBooking-model');
const Patient = require('../model/patient-model');
const Doctor = require('../model/doctor-model');

const bookAppoinment = async (req, res) => {
    try {
        const { doctorId, appointmentDate, appointmentTime, status } = req.body;
        const patientId = req.user.id;

        // Query the patient and doctor from the database
        const patient = await Patient.findById(patientId);  // Corrected method name (findById)
        const doctor = await Doctor.findById(doctorId);  // Corrected method name (findById)
    
        if (!doctor) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }

        if (!patient) {
            return res.status(404).json({ msg: 'Patient not found' });
        }

    

        // Check if the doctor is available at the requested time
        const existingAppointment = await BookingModel.findOne({
            doctorId,
            appointmentDate,
            appointmentTime,
            status: { $ne: 'cancelled' }  // Don't allow booking if there's already a scheduled appointment
        });
        
        if (existingAppointment) {
            return res.status(400).json({ msg: 'The doctor is already booked at this time' });
        }

        // Create a new booking
        const newBooking = new BookingModel({
            patientId,
            doctorId,
            appointmentDate,
            appointmentTime,
            status: status || "pending"  // Default to "pending" if no status provided
        });

        // Save the new booking to the database
        await newBooking.save();


        // Respond with the booking details, Patient, and doctor info
        res.status(201).json({
            message: 'Appointment booked successfully',
            newBooking,
            Patient,
            doctor
        });

    } catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ error: error.message });
    }
};

// Function to cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
        const { bookingId } = req.body;

        // Find the booking
        const booking = await BookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        // Update the booking status to 'cancelled'
        booking.status = 'cancelled';
        await booking.save();

        // Notify doctor and patient about the cancellation
        const Patient = await Patient.findById(booking.patientId);
        const doctor = await Doctor.findById(booking.doctorId);
        res.status(200).json({ msg: 'Appointment cancelled successfully' });
    } catch (error) {
        console.error("Error cancelling appointment:", error);
        res.status(500).json({ error: error.message });
    }
};

// Function to reschedule an appointment
const rescheduleAppointment = async (req, res) => {
    try {
        const { bookingId, newAppointmentDate, newAppointmentTime } = req.body;

        // Find the booking
        const booking = await BookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        // Check if new appointment time is available
        const existingAppointment = await BookingModel.findOne({
            doctorId: booking.doctorId,
            appointmentDate: newAppointmentDate,
            appointmentTime: newAppointmentTime,
            status: { $ne: 'cancelled' }
        });

        if (existingAppointment) {
            return res.status(400).json({ msg: 'The doctor is already booked at the new time' });
        }

        // Update the booking with new date and time
        booking.appointmentDate = newAppointmentDate;
        booking.appointmentTime = newAppointmentTime;
        await booking.save();

        // Notify both parties about the rescheduling
        const Patient = await Patient.findById(booking.patientId);
        const doctor = await Doctor.findById(booking.doctorId);
        sendNotification(doctor.email, 'Appointment Rescheduled', `The appointment with patient ${Patient.name} has been rescheduled to ${newAppointmentDate} at ${newAppointmentTime}.`);
        sendNotification(Patient.email, 'Appointment Rescheduled', `Your appointment with Dr. ${doctor.name} has been rescheduled to ${newAppointmentDate} at ${newAppointmentTime}.`);

        res.status(200).json({ message: 'Appointment rescheduled successfully', booking });
    } catch (error) {
        console.error("Error rescheduling appointment:", error);
        res.status(500).json({ error: error.message });
    }
};

const getPatientAppointments = async (req, res) => {
    try {

        // Find all bookings for the patient
        const bookings = await BookingModel.find();

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ msg: 'No bookings found for this patient' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    bookAppoinment,
    cancelAppointment,
    rescheduleAppointment,
    getPatientAppointments
};

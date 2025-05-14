const BookingModel = require('../model/appoinmentBooking-model');
const Patient = require('../model/patient-model');
const Doctor = require('../model/doctor-model');
const mongoose = require('mongoose');

// Book appointment and notify doctor via Socket.io
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, appointmentTime, status, visitType, visitReason } = req.body;
    const patientId = req.user.id;
      console.log("🔐 Token Decoded User:", req.user);
      
      console.log("Doctor ID:", doctorId);

      

    // Validate patient and doctor
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient) return res.status(404).json({ msg: "Patient not found" });
    if (!doctor) return res.status(404).json({ msg: "Doctor not found" });

    // Check for existing appointment
    const existingAppointment = await BookingModel.findOne({
      doctorId,
      appointmentDate,
      appointmentTime,
      status: { $ne: "cancelled" },
    });

    if (existingAppointment) {
      return res.status(400).json({ msg: "The doctor is already booked at this time" });
    }

    // Create booking
    const newBooking = new BookingModel({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      status,
      visitType,
      visitReason,
    });

    await newBooking.save();

    // Real-time notification to doctor via socket
    const io = req.app.get("io");
    const connectedUsers = req.app.get("connectedUsers");
    const doctorSocketId = connectedUsers.get(doctorId);

    if (doctorSocketId) {
   const populatedBooking = await newBooking.populate("patientId doctorId");

io.to(doctorSocketId).emit("new-appointment", {
  message: "📅 New appointment booked by a patient.",
  appointment: populatedBooking,
});

    }

    return res.status(201).json({
      message: "Appointment booked successfully",
      booking: newBooking,
      doctor,
      patient,
    });

  } catch (error) {
    console.error("Booking error:", error.message);
    return res.status(500).json({ message: "Server error", error: error.message });
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

const getPatientAppointmentsById = async (req, res) => {
    try {
        const { patientId } = req.params;

        const bookings = await BookingModel.find({
            patientId
        }).populate('doctorId').populate('patientId');

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ msg: 'No bookings found for this patient' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: error.message });
    }
};


const getDoctorAppointmentsById = async (req, res) => {
    try {
        const { doctorId } = req.params;

        const bookings = await BookingModel.find({
            doctorId
        }).populate('doctorId').populate('patientId');

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ msg: 'No bookings found for this doctor' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ error: error.message });
    }
};


const getPatientAppointments = async (req, res) => {
    try {


        // Find all bookings for the patient
        const bookings = await BookingModel.find().populate('patientId').populate('doctorId')

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
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment,
    getPatientAppointmentsById,
    getPatientAppointments,
    getDoctorAppointmentsById,

};

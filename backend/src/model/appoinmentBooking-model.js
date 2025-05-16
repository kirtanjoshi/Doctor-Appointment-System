const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({ 
 doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  appointmentDate: {
    type: String,
    required: true
  },
  appointmentTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  },
  visitType: {
    type: String,
    required: false
  },
  reasonForVisit:
  { 
    type: String,
    required: false 
    },
  createdAt: {
    type: Date,
    default: Date.now
    },
  
   updatedAt: {
    type: Date,
        default: Date.now
    }
   
})

module.exports = mongoose.model('Booking', BookingSchema);
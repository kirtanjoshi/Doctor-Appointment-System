const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    doctorId: { type: Schema.Types.ObjectId },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profilePic : {type: String, required: false},
    fullName: { type: String, required: true },
    role: {
        type: String, enum: ["doctor"],
        required: true,
        default: "doctor"
    },
  
    fee: { type: Number, required: true },
    specialization: { type: String },
    qualifications: { type: String },

    availability: [{
        day: { type: String, required: true },
        timeSlot: [
            { type: [String], required: true }
        ]
    }],


    experience: { type: Number },

} , {timestamps:true});

module.exports = mongoose.model("Doctor", DoctorSchema);
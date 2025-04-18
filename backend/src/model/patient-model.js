const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({

    id : { type: Schema.Types.ObjectId },
    
    fullname: { type: String},
    
    patientName: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
           unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
           unique: true
    },

    role: { type: String, enum: ["patient"], required: true },

    phone: {
        type: Number,
        required: [true, 'Please add a phone number'],
        maxlength: [20, 'Phone number cannot be longer than 20 characters']
    },

    gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
    },

    updatedOn:{type: Date},
    createdOn:{type: Date},
});

PatientSchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();
    next();
});

module.exports = mongoose.model("Patient", PatientSchema);
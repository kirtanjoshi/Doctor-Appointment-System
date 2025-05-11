const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    profilePic: { type: String },

    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true
    },

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Password is required']
    },

    role: { type: String, enum: ["patient"], required: true },

    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        maxlength: [20, 'Phone number cannot be longer than 20 characters']
    },

    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age cannot be negative']
    },

    createdOn: { type: Date },
    updatedOn: { type: Date },
});

PatientSchema.pre('save', function (next) {
    const now = new Date();
    this.updatedOn = now;
    if (!this.createdOn) {
        this.createdOn = now;
    }
    next();
});

module.exports = mongoose.model("Patient", PatientSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    Fullname: { type: String, required: true },
    role: { type: String, enum: ["doctor"], required: true },
    bio: { type: String, required: true },
    fee: { type: String, required: true },
    specialization: { type: String },
    qualifications: { type: String },
    experience: { type: Number },
    updatedOn: { type: Date },
    createdOn: { type: Date },
})
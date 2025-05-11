const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: {
        type: String, enum: ["admin"],
        required: true,
        default: "admin"
    },
} , {timestamps:true});

module.exports = mongoose.model("Admin", AdminSchema);
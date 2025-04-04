const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    id : { type: Schema.Types.ObjectId, ref: 'User' },
    
    fullname: { type: String},
    
    userName: {
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
        type: String,
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

UserSchema.pre('save', function (next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();
    next();
});

module.exports = mongoose.model("User", UserSchema);
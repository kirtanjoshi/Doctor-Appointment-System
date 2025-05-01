const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DoctorModel = require("../model/doctor-model");
const { uploadCloudinary } = require('../utils/cloudinary'); // ✅ FIXED
const fs = require('fs').promises;
require('dotenv').config();

const createDoctorAccount = async (req, res) => {
    try {
        const { email, password, experience, availability, qualifications, specialization, fee, role, fullName } = req.body;


        const existingDoctor = await DoctorModel.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: "Doctor already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

           // Parse availability (from string to object)
    // let parsedAvailability;
    // try {
    //   parsedAvailability = JSON.parse(availability);
    // } catch (err) {
    //   return res.status(400).json({ message: "Invalid availability format" });
    // }

        let parsedAvailability = availability;
if (typeof availability === 'string') {
    try {
        parsedAvailability = JSON.parse(availability);
    } catch (err) {
        return res.status(400).json({ message: "Invalid availability format" });
    }
}


        let imageUrl = ''; // Default

        if (req.file) {
            const filePath = req.file.path;
            const result = await uploadCloudinary(filePath, {
                folder: 'doctors',
            });
            imageUrl = result.secure_url;
            await fs.unlink(filePath); // Delete local file
        }
        
   

        const doctor = new DoctorModel({
            email,
            password: hashedPassword,
            fullName,
            role,
            fee,
            specialization,
            qualifications,
            availability:parsedAvailability,
            profilePic: imageUrl,
            experience
        });

        await doctor.save();
        res.status(201).json({ message: "Doctor registered successfully" });
    } catch (error) {
        if (req.file) {
            await fs.unlink(req.file.path).catch(err => console.error('Failed to delete local file:', err));
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await DoctorModel.findOne({ email });


        
        if (!doctor) {
            return res.status(404).json({ message: "Doctor does not exist" });
        }

        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        const token = jwt.sign(
            { id: doctor._id, role: doctor.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            doctor: {
                id: doctor._id,
                fullName: doctor.fullName,
                email: doctor.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllDoctors = async (req, res) => 
{
    try {
        const doctors = await DoctorModel.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, fullName, fee, specialization, qualifications, availability, experience } = req.body;

        const doctor = await DoctorModel.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        // Update fields
        if (email) doctor.email = email;
        if (fullName) doctor.fullName = fullName;
        if (fee) doctor.fee = fee;
        if (specialization) doctor.specialization = specialization;
        if (qualifications) doctor.qualifications = qualifications;
        // if (availability) doctor.availability = availability;
        if (availability) {
    doctor.availability = typeof availability === 'string' ? JSON.parse(availability) : availability;
}

        if (experience) doctor.experience = experience;

        // Handle profile picture update
        if (req.file) {
            const filePath = req.file.path;
            const result = await uploadCloudinary(filePath, {
                folder: 'doctors',
            });
            doctor.profilePic = result.secure_url;
            await fs.unlink(filePath);
        }

        await doctor.save();
        res.json({ message: "Doctor updated successfully", doctor });
    } catch (error) {
        if (req.file) {
            await fs.unlink(req.file.path).catch(err => console.error('Failed to delete local file:', err));
        }
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getDoctorById = async (req, res) => {

    try {
        const { id } = req.params;
        const doctorId = await DoctorModel.findById(id);
         if (!doctorId) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        await res.status(200).json(doctorId);

    }
    catch (e) {
         res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await DoctorModel.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        await DoctorModel.findByIdAndDelete(id);
        res.json({ message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createDoctorAccount, loginDoctor, updateDoctor  , getAllDoctors , getDoctorById};

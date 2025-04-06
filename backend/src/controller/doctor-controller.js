// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const DoctorModel = require('../model/doctor-model');
// const dotenv = require('dotenv');
// dotenv.config();


// const createDoctorAccount = async (req, res) => {
//     try {
//         const { email, password , experience,availability ,qualifications ,specialization,fee,role,fullName ,profilePic} = req.body;
//         const existingDoctor = await DoctorModel.findOne({ email: email });

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
     
//         let imageUrl = '';
//         if (req.file) {
//       // File has been saved to disk by Multer (e.g., uploads/doctor-123456789.jpg)
//          const filePath = req.file.path;

//      // Upload the file to Cloudinary
//       const result = await cloudinary.uploader.upload(filePath, {
//         folder: 'doctors', // Store in 'doctors' folder in Cloudinary
//       });

//       imageUrl = result.secure_url; // Get the secure URL of the uploaded image

//       // Delete the local file after uploading to Cloudinary
//       await fs.unlink(filePath);
//     }

//         if(existingDoctor){
//             return res.send("Doctor already exists");
//         }
//          const doctor = new DoctorModel({
//              email,
//              password: hashedPassword,
//              fullName,
//              role,
//              fee,
//              specialization,
//              qualifications,
//              availability,
//              profilePic,
//              experience
//     });
//         await doctor.save();


//       res.status(201).json({ msg: "Doctor registered successfully" });
//     } catch (error) {
//     // If there's an error, delete the local file if it exists
//     if (req.file) {
//       await fs.unlink(req.file.path).catch(err => console.error('Failed to delete local file:', err));
//     }
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// }


// const loginDoctor =async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         const Doctor = await DoctorModel.findOne({ email: email});
//         if(!Doctor){
//             return res.send("Doctor does not exist");
//         }

//         const isMatch = await bcrypt.compare(password, Doctor.password);
//         if (!isMatch) {
//             return res.send("Password is incorrect");
//         }

//         const token = jwt.sign(
//             { id: Doctor._id, role: Doctor.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         res.json({
//             message: 'Login successful',
//             token,
//             Doctor: {
//                 id: Doctor._id,
//                 DoctorName: Doctor.DoctorName,
//                 email: Doctor.email
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };


// const updateDoctor = (req, res) => {
//     try {
        
//     }
//     catch (error) {
        
//     }
// }

// module.exports = { createDoctorAccount, loginDoctor };


// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const DoctorModel = require("../model/doctor-model")
// // const cloudinary = require('cloudinary').v2; // Assuming Cloudinary is used
// const uploadCloudinary = require('../utils/cloudinary');
// const fs = require('fs').promises; // For file system operations
// require('dotenv').config();


// const createDoctorAccount = async (req, res) => {
//     try {
//         const { email, password, experience, availability, qualifications, specialization, fee, role, fullName } = req.body;
//         const existingDoctor = await DoctorModel.findOne({ email });

//         if (existingDoctor) {
//             return res.status(400).json({ message: "Doctor already exists" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         let imageUrl = '';
//         if (req.file) {
//             const filePath = req.file.path;
//             const result = await uploadCloudinary(filePath, {
//                 folder: 'doctors',
//             });
//             imageUrl = result.secure_url;
//             await fs.unlink(filePath); // Delete local file after upload
//         }
//          else {
//     // Default profile image
//     imageUrl = "https://example.com/default-profile.jpg";
// }

//         const doctor = new DoctorModel({
//             email,
//             password: hashedPassword,
//             fullName,
//             role,
//             fee,
//             specialization,
//             qualifications,
//             availability,
//             profilePic: imageUrl,
//             experience
//         });

//         await doctor.save();
//         res.status(201).json({ message: "Doctor registered successfully" });
//     } catch (error) {
//         if (req.file) {
//             await fs.unlink(req.file.path).catch(err => console.error('Failed to delete local file:', err));
//         }
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const loginDoctor = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const doctor = await DoctorModel.findOne({ email });

//         if (!doctor) {
//             return res.status(404).json({ message: "Doctor does not exist" });
//         }

//         const isMatch = await bcrypt.compare(password, doctor.password);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Password is incorrect" });
//         }

//         const token = jwt.sign(
//             { id: doctor._id, role: doctor.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         res.json({
//             message: 'Login successful',
//             token,
//             doctor: {
//                 id: doctor._id,
//                 fullName: doctor.fullName,
//                 email: doctor.email
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// const updateDoctor = async (req, res) => {
//     try {
//         const { id } = req.params; // Assuming doctor ID is passed as a URL parameter
//         const { email, fullName, fee, specialization, qualifications, availability, experience } = req.body;

//         const doctor = await DoctorModel.findById(id);
//         if (!doctor) {
//             return res.status(404).json({ message: "Doctor not found" });
//         }

//         // Update fields if provided
//         if (email) doctor.email = email;
//         if (fullName) doctor.fullName = fullName;
//         if (fee) doctor.fee = fee;
//         if (specialization) doctor.specialization = specialization;
//         if (qualifications) doctor.qualifications = qualifications;
//         if (availability) doctor.availability = availability;
//         if (experience) doctor.experience = experience;

//         // Handle profile picture update
//         if (req.file) {
//             const filePath = req.file.path;
//             const result = await cloudinary.uploader.upload(filePath, {
//                 folder: 'doctors',
//             });
//             doctor.profilePic = result.secure_url;
//             await fs.unlink(filePath); // Delete local file
//         }

//         await doctor.save();
//         res.json({ message: "Doctor updated successfully", doctor });
//     } catch (error) {
//         if (req.file) {
//             await fs.unlink(req.file.path).catch(err => console.error('Failed to delete local file:', err));
//         }
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

// module.exports = { createDoctorAccount, loginDoctor, updateDoctor };


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
    let parsedAvailability;
    try {
      parsedAvailability = JSON.parse(availability);
    } catch (err) {
      return res.status(400).json({ message: "Invalid availability format" });
    }

        let imageUrl = 'https://example.com/default-profile.jpg'; // Default

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
        if (availability) doctor.availability = availability;
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

module.exports = { createDoctorAccount, loginDoctor, updateDoctor };

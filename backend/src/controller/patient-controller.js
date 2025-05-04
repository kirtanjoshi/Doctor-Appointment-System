const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const PatientModel = require('../model/patient-model');
const dotenv = require('dotenv');
dotenv.config();

const createPatient = async (req, res) => {
    try {
        const { email, password , patientName , fullName , role,phone , gender} = req.body;
        const existingPatient = await PatientModel.findOne({ email: email });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
     
        if(existingPatient){
            return res.send("Patient already exists");
        } 
         const patient = new PatientModel({
         
             fullName,
             patientName,
             email,
             password: hashedPassword,
             phone,
             gender,
             role,
            
    });
        await patient.save();


      res.status(201).json({ msg: "Patient registered successfully" });
    } catch (error) {
       res.status(500).json({ error});  
    }
}


const loginPatient =async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const patient = await PatientModel.findOne({ email: email});
        if(!patient){
            return res.send("Patient does not exist");
        }

        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch) {
            return res.send("Password is incorrect");
        }

        const token = jwt.sign(
            { id: patient._id, role: patient.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            patient: {
                id: patient._id,
                patientName: patient.patientName,
                email: patient.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await PatientModel.find();
        res.status(200).json(patients);

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const updatePatient = (req, res) => {
    try {
        
    }
    catch (error) {
        
    }
}

module.exports = { createPatient, loginPatient,getAllPatients };
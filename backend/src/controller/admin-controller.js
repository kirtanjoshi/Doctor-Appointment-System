const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminModel = require('../model/admin-model');
const dotenv = require('dotenv');
dotenv.config();

const createAdmin = async (req, res) => {
    try {
        const { email, password , fullName} = req.body;
        const existingAdmin = await AdminModel.findOne({ email: email });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
     


        if(existingAdmin){
            return res.send("admin already exists");
        } 
         const admin = new AdminModel({
    
            email,
            password: hashedPassword,
            fullName,
            
    });
        await admin.save();


      res.status(201).json({ msg: "Admin registered successfully" });
    } catch (error) {
       res.status(500).json({ error: error.message });  
    }
}


const loginAdmin =async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const admin = await AdminModel.findOne({ email: email});
        if(!admin){
            return res.send("Admin does not exist");
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.send("Password is incorrect");
        }

        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            token,
            admin
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { createAdmin, loginAdmin,};
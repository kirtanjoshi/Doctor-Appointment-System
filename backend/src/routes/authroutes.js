const express = require('express');
const route = express.Router();
const { createPatient, loginPatient } = require('../controller/patient-controller');
const { loginAdmin , createAdmin} = require('../controller/admin-controller');
const { createDoctorAccount, loginDoctor, updateDoctor } = require('../controller/doctor-controller');
const upload = require('../middleware/multer-middleware')

route.post('/patient/register', upload.single('profilePic'), createPatient);
route.post('/patient/login', loginPatient);


route.post('/admin/login', loginAdmin);
route.post('/admin/register', createAdmin);

// Routes
route.post('/doctor/register', upload.single('profilePic'), createDoctorAccount);
route.post('/doctor/login', loginDoctor);
route.put('/doctor/update/:id', upload.single('profilePic'), updateDoctor);


module.exports = route;
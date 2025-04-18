const express = require('express');
const route = express.Router();
const { createPatient, loginPatient } = require('../controller/patient-controller');
const { createDoctorAccount, loginDoctor, updateDoctor } = require('../controller/doctor-controller');
const upload = require('../middleware/multer-middleware')

route.post('/patient/register', createPatient);
route.post('/patient/login', loginPatient);

// Routes
route.post('/doctor/register', upload.single('profilePic'), createDoctorAccount);
route.post('/doctor/login', loginDoctor);
route.put('/doctor/update/:id', upload.single('profilePic'), updateDoctor);


module.exports = route;
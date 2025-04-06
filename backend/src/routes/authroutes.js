const express = require('express');
const route = express.Router();
const { createUser, loginUser } = require('../controller/user-controller');
const { createDoctorAccount, loginDoctor, updateDoctor } = require('../controller/doctor-controller');
const upload = require('../middleware/multer')

route.post('/register', createUser);
route.post('/register/', createUser);
route.post('/login', loginUser);

// Routes
route.post('/doctor/register', upload.single('profilePic'), createDoctorAccount);
route.post('/doctor/login', loginDoctor);
route.put('/doctor/update/:id', upload.single('profilePic'), updateDoctor);


module.exports = route;
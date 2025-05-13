const express = require('express');
const router = express.Router();
const controller = require('../controller/doctor-controller');
const upload = require('../middleware/multer-middleware')


router.get('/doctors', controller.getAllDoctors);
router.get('/doctors/:id', controller.getDoctorById);
router.put('/doctors/update/:id',upload.single('profilePic'), controller.updateDoctor);
router.delete('/doctors/delete/:id',upload.single('profilePic'), controller.deleteDoctor);


module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controller/patient-controller');

router.get('/patient', controller.getAllPatients);
router.get('/patient/update/:id', controller.updatePatient);
// router.get('/doctors/:id', controller.getDoctorById);


module.exports = router;
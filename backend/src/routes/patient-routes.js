const express = require('express');
const router = express.Router();
const controller = require('../controller/patient-controller');

router.get('/patients', controller.getAllPatients);
router.put('/patient/update/:id', controller.updatePatient);
// router.get('/doctors/:id', controller.get);


module.exports = router;
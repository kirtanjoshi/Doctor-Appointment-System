const express = require('express');
const router = express.Router();
const controller = require('../controller/doctor-controller');

router.get('/doctors', controller.getAllDoctors);


module.exports = router;
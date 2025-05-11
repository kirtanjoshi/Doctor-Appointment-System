const express = require('express');
const router = express.Router();
const controller = require('../controller/patient-controller');
const upload = require('../middleware/multer-middleware')

router.get('/patients', controller.getAllPatients);
router.put('/patient/update/:id',upload.single('profilePic'), controller.updatePatient);
// router.get('/doctors/:id', controller.get);


module.exports = router;
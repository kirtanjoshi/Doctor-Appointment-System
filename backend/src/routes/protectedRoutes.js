
const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

const PatientModel = require('../model/patient-model');

router.get('/dashboard', authMiddleware, async (req, res) => {
    try {
        const patient = await PatientModel.findById(req.user.id).select('-password'); // exclude password

        if (!patient) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ msg: 'Welcome to dashboard', patient });
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

module.exports = router;


const express = require('express');
const authMiddleware = require('../middleware/authmiddleware');

const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
    res.json({ msg: `Welcome, User ID: ${req.user.id}` , role: req.user.role });
});

module.exports = router;

const express = require('express');
const route = express.Router();
const { createUser, loginUser } = require('../controller/user-controller');


route.post('/register', createUser);
route.post('/login', loginUser);

module.exports = route;
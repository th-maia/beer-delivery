const express = require('express');
const { register } = require('../controllers/Register.controller');
const userCheck = require('../middlewares/UserDataMiddleware');
const nameCheck = require('../middlewares/userNameMiddleware');

const registerRoute = express.Router();

registerRoute.post('/', userCheck, nameCheck, register);

module.exports = { registerRoute };

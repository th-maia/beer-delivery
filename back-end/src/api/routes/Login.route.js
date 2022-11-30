const express = require('express');
const { login } = require('../controllers/Login.controller');
const userCheck = require('../middlewares/UserDataMiddleware');

const loginRoute = express.Router();

loginRoute.post('/', userCheck, login);

module.exports = { loginRoute };

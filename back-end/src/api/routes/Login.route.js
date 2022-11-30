const { login } = require('../controllers/Login.controller');
const express = require('express');

const loginRoute = express.Router();

loginRoute.post('/', login);

module.exports = { loginRoute };

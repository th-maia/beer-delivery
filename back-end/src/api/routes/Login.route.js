const express = require('express');
const { login } = require('../controllers/Login.controller');

const loginRoute = express.Router();

loginRoute.post('/', login);

module.exports = { loginRoute };

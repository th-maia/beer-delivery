const express = require('express');
const { getAllClients, deleteUserController } = require('../controllers/Adm.controller');
const checkAdm = require('../middlewares/VerifyAdmMiddleware');
const { register } = require('../controllers/Register.controller');
const userCheck = require('../middlewares/UserDataMiddleware');
const nameCheck = require('../middlewares/userNameMiddleware');

const admRoute = express.Router();

admRoute.get('/', checkAdm, getAllClients);
admRoute.post('/register', checkAdm, userCheck, nameCheck, register);
admRoute.delete('/:id', checkAdm, deleteUserController);

module.exports = { admRoute };

const express = require('express');
const { getAllClients, deleteUserController } = require('../controllers/Adm.controller');
const checkAdm = require('../middlewares/VerifyAdmMiddleware');

const admRoute = express.Router();

admRoute.get('/', checkAdm, getAllClients);
admRoute.delete('/:id', checkAdm, deleteUserController);

module.exports = { admRoute };
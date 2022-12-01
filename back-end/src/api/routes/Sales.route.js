const express = require('express');
const { getSales } = require('../controllers/Sales.controller');
const checkToken = require('../middlewares/VerifyTokenMiddleware');
const checkBodySale = require('../middlewares/SaleMiddleware');
const { newSale } = require('../controllers/Sales.controller');

const salesRoute = express.Router();

salesRoute.get('/', checkToken, getSales);

salesRoute.post('/', checkToken, checkBodySale, newSale);

module.exports = { salesRoute };
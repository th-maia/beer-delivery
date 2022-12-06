const express = require('express');
const { 
    getSales,
    getSalesBySeller,
    newSale,
    getSalesProductsById, 
} = require('../controllers/Sales.controller');
const checkToken = require('../middlewares/VerifyTokenMiddleware');
const checkBodySale = require('../middlewares/SaleMiddleware');

const salesRoute = express.Router();

salesRoute.get('/seller', checkToken, getSalesBySeller);
salesRoute.get('/:id', checkToken, getSalesProductsById);
salesRoute.get('/', checkToken, getSales);
salesRoute.post('/', checkToken, checkBodySale, newSale);

module.exports = { salesRoute };
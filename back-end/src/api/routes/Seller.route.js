const express = require('express');
const { 
    getAllSellers,
    getSalesBySeller,
} = require('../controllers/Seller.controller');

const checkToken = require('../middlewares/VerifyTokenMiddleware');

const sellerRoute = express.Router();

sellerRoute.get('/', checkToken, getAllSellers);
sellerRoute.get('/sales', checkToken, getSalesBySeller);

module.exports = { sellerRoute };
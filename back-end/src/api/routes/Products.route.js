const express = require('express');
const { getProducts } = require('../controllers/Products.controller');

const productsRoute = express.Router();

productsRoute.get('/', getProducts);

module.exports = { productsRoute };
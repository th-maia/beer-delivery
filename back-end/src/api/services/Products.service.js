const { Product } = require('../../database/models/index');
const CustomHttpError = require('../middlewares/CustomHttpError');

const getAllProducts = async () => {
  const products = await Product.findAll();
  
  if (!products) {
    throw new CustomHttpError(404, 'NO PRODUCTS FOUND')
  }

  return products;
}

module.exports = { getAllProducts };
const { Sale, User } = require('../../database/models/index');
const CustomHttpError = require('../middlewares/CustomHttpError');

const getSellers = () => {
  const sellers = User.findAll({ where: { role: 'seller' } });
  if (!sellers) throw new CustomHttpError(404, 'NO SELLER FOUND');
  return sellers;
};

const getAllSalesBySeller = async (id) => {
    const sales = await Sale.findAll({ where: { sellerId: id } });
    if (!sales || sales.length === 0) {
      throw new CustomHttpError(404, 'NO SALES FOUND FOR THIS SELLER');
    }
    return sales;
};

module.exports = { getSellers, getAllSalesBySeller };
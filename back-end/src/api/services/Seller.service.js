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

const updateSalesBySeller = async (id, status) => {
  if (status.toLowerCase() === 'entregue') throw new CustomHttpError(405, 'UPDATE NOT ALLOWED');
  const sales = await Sale.update({ status }, { where: { id } });
  if (!sales) throw new CustomHttpError(400, 'NOT UPDATED');
  return 'UPDATED';
};

module.exports = { getSellers, getAllSalesBySeller, updateSalesBySeller };  
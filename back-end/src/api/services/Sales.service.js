const { Sale, SaleProduct } = require('../../database/models/index');
const CustomHttpError = require('../middlewares/CustomHttpError');

const getAllSales = async (id) => {
  const sales = await Sale.findAll({ where: { userId: id } });
  if (!sales || sales.length === 0) throw new CustomHttpError(404, 'NO SALES FOUND FOR THIS USER');
  return sales;
};

const createNewSale = async (userId, sale) => {
    const newSale = await Sale.create({
        userId,
        sellerId: sale.sellerId,
        totalPrice: sale.totalPrice,
        deliveryAddress: sale.deliveryAddress,
        deliveryNumber: sale.deliveryNumber,
        saleDate: sale.saleDate,
        status: sale.status,
    });

    if (!newSale) throw new CustomHttpError(500, 'SALE NOT FINISHED');

    sale.products.map(async (product) => {
        await SaleProduct.create({
            saleId: newSale.id,
            productId: product.productId,
            quantity: product.quantity,
        });
    });

    return newSale;
};

module.exports = { getAllSales, createNewSale };
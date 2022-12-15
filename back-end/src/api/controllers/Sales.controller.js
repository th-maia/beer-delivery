const salesService = require('../services/Sales.service');

const getSales = async (req, res) => {
  const id = Number(req.headers.id);
  const sales = await salesService.getAllSales(id);
  return res.status(200).json(sales);
};

const newSale = async (req, res) => {
    const id = Number(req.headers.id);
    const sale = await salesService.createNewSale(id, req.body);
    return res.status(201).json(sale);
};

const getSalesProductsById = async (req, res) => {
  const id = Number(req.params.id);
  const saleById = await salesService.getSalesProduct(id);
  return res.status(200).json(saleById);
}; 

const checkoutSale = async (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  const sale = await salesService.checkout(id, status);
  return res.status(200).json({ message: sale });
};

module.exports = { getSales, newSale, getSalesProductsById, checkoutSale };
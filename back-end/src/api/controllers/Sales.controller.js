const { getAllSales, createNewSale, getSalesProduct } = require('../services/Sales.service');

const getSales = async (req, res) => {
  const id = Number(req.headers.id);
  const sales = await getAllSales(id);
  return res.status(200).json(sales);
};

const newSale = async (req, res) => {
    const id = Number(req.headers.id);
    const sale = await createNewSale(id, req.body);
    return res.status(201).json(sale);
};

const getSalesProductsById = async (req, res) => {
  const id = Number(req.params.id);
  console.log('id--------', id);
  const saleById =  await getSalesProduct(id);
  return res.status(200).json(saleById);
}; 

module.exports = { getSales, newSale, getSalesProductsById };
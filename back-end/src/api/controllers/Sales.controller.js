const { getAllSales, createNewSale } = require('../services/Sales.service');

const getSales = async (req, res) => {
  const id = Number(req.headers.id);
  const sales = await getAllSales(id);
  return res.status(200).json(sales);
};

const newSale = async (req, res) => {
    const id = Number(req.headers.id);
    const sale = await createNewSale(id, req.body);
    return res.status(201).json(sale);
}

module.exports = { getSales, newSale };
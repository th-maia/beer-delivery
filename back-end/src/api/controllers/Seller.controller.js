const {
    getSellers,
    getAllSalesBySeller,
} = require('../services/Seller.service');

const getAllSellers = async (_req, res) => {
    const sales = await getSellers();
    return res.status(200).json(sales);
};

const getSalesBySeller = async (req, res) => {
    const id = Number(req.headers.id);
    const sales = await getAllSalesBySeller(id);
    return res.status(200).json(sales);
};

module.exports = { getAllSellers, getSalesBySeller };

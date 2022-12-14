const { expect } = require('chai');
const sinon = require('sinon');
const chai = require("chai");
const sinonChai = require("sinon-chai");

const { Model } = require('sequelize');
const { describe } = require('mocha');
const salesController = require('../../../api/controllers/Sales.controller');
const sellerController = require('../../../api/controllers/Seller.controller');
const sellerService = require('../../../api/services/Seller.service');
const { allSellers } = require('../../mocks/sellers');
const { allSales } = require('../../mocks/sales');

chai.use(sinonChai);

describe ('Testes da rota sellers, camada service', () => {
    describe('Visualizar todos os vendedores', () => {
        beforeEach(async () => {
            sinon.stub(sellerService, 'getSellers').resolves(allSellers);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas os vendedores', async () => {
            const res = {};
            const req = { headers: {}, body: {} };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await sellerController.getAllSellers(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(allSellers);
        });
    });

    describe('Teste se não existir nenhuma vendedor a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(sellerService, 'getSellers').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for encontrado nenhum vendedor', async () => {
            try {
                const res = {};
                const req = { headers: {}, body: {} };

                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();

                await sellerController.getAllSellers(req, res);
            } catch (err) {
                expect(err.message).to.be.deep.equal('NO SELLER FOUND');
            }
        });
    });

    describe('Visualizar as vendas', () => {
        beforeEach(async () => {
            sinon.stub(sellerService, 'getAllSalesBySeller').resolves(allSales);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas as vendas realizadas pelo vendedor', async () => {
            const res = {};
            const req = { headers: { id: 1 }, body: {} };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await salesController.getSalesBySeller(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(allSales);
        });
    });

    describe('Teste se não existir nenhuma compra a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(sellerService, 'getAllSalesBySeller').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for passado um dos parâmetros', async () => {
            try {
                const res = {};
                const req = { headers: { id: 1 }, body: {} };
    
                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();
    
                await salesController.getSales(req, res);
            } catch (err) {
                expect(err.message).to.be.deep.equal('NO SALES FOUND FOR THIS USER');
            }
        });
    });
});
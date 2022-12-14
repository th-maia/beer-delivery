const { expect } = require('chai');
const sinon = require('sinon');
const chai = require("chai");
const sinonChai = require("sinon-chai");
const { describe } = require('mocha');

const { Model } = require('sequelize');
const { newSaleResponse, newSaleRequest, allSales, productsSale } = require('../../mocks/sales');
const salesService = require('../../../api/services/Sales.service');
const salesController = require('../../../api/controllers/Sales.controller');
const sellerService = require('../../../api/services/Seller.service');

chai.use(sinonChai);

describe ('Testes da rota sales, camada controller', () => {
    describe('Teste se é realizado uma venda com com sucesso', () => {
        beforeEach(async () => {
            sinon.stub(salesService, 'createNewSale').resolves(newSaleResponse);
        });
        afterEach(() => sinon.restore());
        it('Deve ser feito uma venda com sucesso e retornar a venda', async () => {
            const res = {};
            const req = { headers: { id: 1 }, body: newSaleRequest };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await salesController.newSale(req, res);

            expect(res.status).to.have.been.calledWith(201);
            expect(res.json).to.have.been.calledWith(newSaleResponse);
        });
    });

    describe('Teste se ocorrer algum erro', () => {
        beforeEach(async () => {
            sinon.stub(salesService, 'createNewSale').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for passado um dos parâmetros', async () => {
            try {
                const res = {};
            const req = { headers: { id: 0 }, body: newSaleRequest };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await salesController.newSale(req, res);
            } catch (err) {
                expect(err.message).to.be.deep.equal('SALE NOT FINISHED');
            }
        });
    });

    describe('Visualizar as compras', () => {
        beforeEach(async () => {
            sinon.stub(salesService, 'getAllSales').resolves(allSales);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas as compras', async () => {
            const res = {};
            const req = { headers: { id: 1 }, body: {} };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await salesController.getSales(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(allSales);
        });
    });

    describe('Teste se não existir nenhuma compra a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(salesService, 'getAllSales').resolves();
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

    describe('Visualizar os produtos de uma compra específica', () => {
        beforeEach(async () => {
            sinon.stub(salesService, 'getSalesProduct').resolves(productsSale);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todos os produtos da compra', async () => {
            const res = {};
            const req = { params: { id: 1 }, body: {} };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await salesController.getSalesProductsById(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(productsSale);
        });
    });

    describe('Teste se não existir nenhuma compra e produtos a serem visualizados', () => {
        beforeEach(async () => {
            sinon.stub(salesService, 'getSalesProduct').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não existir produtos nem venda, mas for pesquisado os produtos com id errado', async () => {
            try {
                const res = {};
                const req = { params: { id: 1 }, body: {} };

                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();

                await salesController.getSalesProductsById(req, res);
            } catch (err) {
                expect(err.message).to.be.deep.equal('NO PRODUCTS FOUND FOR THIS SALE');
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

    describe('Atualizar o status de uma venda', () => {
        beforeEach(async () => {
            sinon.stub(salesService, 'checkout').resolves('DELIVERED');
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível atualizar o status da venda', async () => {
            const res = {};
            const req = { params: { id: 1 }, body: { status: 'Entregue' } };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await salesController.checkoutSale(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith({ message: 'DELIVERED' });
        });
    });

    describe('Teste se não for possível atualizar o status de uma venda', () => {
        beforeEach(async () => {
            sinon.stub(sellerService, 'updateSalesBySeller').resolves('UPDATE NOT ALLOWED');
        });
        afterEach(() => sinon.restore());
        it('Não é possível atualizar o status da venda', async () => {
            try {
                const res = {};
                const req = { params: { id: 1 }, body: { status: 'Preparando' } };

                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();

                await salesController.checkoutSale(req, res);
            } catch (err) {
                expect(err.message).to.be.deep.equal('UPDATE NOT ALLOWED');
            }
        });
    });

    describe('Teste se não for possível atualizar o status de uma venda inexistente', () => {
        beforeEach(async () => {
            sinon.stub(sellerService, 'updateSalesBySeller').resolves('NOT UPDATED');
        });
        afterEach(() => sinon.restore());
        it('Não é possível atualizar o status da venda', async () => {
            try {
                const res = {};
                const req = { params: { id: 0 }, body: { status: 'Entregue' } };

                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();

                await salesController.checkoutSale(req, res);
            } catch (err) {
                expect(err.message).to.be.deep.equal('NOT UPDATED');
            }
        });
    });
});
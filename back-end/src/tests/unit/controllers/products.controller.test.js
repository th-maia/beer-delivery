const { expect } = require("chai");
const sinon = require("sinon");
const chai = require("chai");
const sinonChai = require("sinon-chai");
const { describe } = require("mocha");

const { Model } = require('sequelize');
const products = require('../../mocks/products');
const productsService = require('../../../api/services/Products.service');
const productsController = require('../../../api/controllers/Products.controller');

chai.use(sinonChai);

describe ('Testes da rota products, camada controller', () => {
    describe('Teste se é retornado um array de produtos com sucesso', () => {
        beforeEach(async () => {
            sinon
            .stub(productsService, 'getAllProducts')
            .onFirstCall()
            .resolves(products);
        });
        afterEach(() => sinon.restore());
        it('Deve ser retornar um array de produtos', async () => {
            const res = {};
            const req = { params: {}, body: {} };

            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns();

            await productsController.getProducts(req, res);

            expect(res.status).to.have.been.calledWith(200);
            expect(res.json).to.have.been.calledWith(products);
        });
    });

    describe('Teste se caso ocorra algum erro', () => {
        beforeEach(async () => {
            sinon
            .stub(productsService, 'getAllProducts')
            .onFirstCall()
            .resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve ser retornado uma mensagem de erro "NO PRODUCTS FOUND"', async () => {
            try {
                const res = {};
                const req = { params: {}, body: {} };

                res.status = sinon.stub().returns(res);
                res.json = sinon.stub().returns();

                await productsController.getProducts(req, res);
            } catch (e) {
                expect(e.message).to.be.deep.equal('NO PRODUCTS FOUND');
            }
        });
    });
});
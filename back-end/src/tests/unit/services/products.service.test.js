const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');
const { describe } = require('mocha');
const products = require('../../mocks/products');
const { getAllProducts } = require('../../../api/services/Products.service');

describe ('Testes da rota products, camada service', () => {
    describe('Teste se é retornado um array de produtos com sucesso', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(products);
        });
        afterEach(() => sinon.restore());
        it('Deve ser retornar um array de produtos', async () => {
            const response = await getAllProducts();
            expect(response).to.be.deep.equal(products);
        });
    });

    describe('Teste se caso ocorra algum erro', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve ser retornado uma mensagem de erro "NO PRODUCTS FOUND"', async () => {
            try {
                const response = await getAllProducts();
                expect(response).to.be.deep.equal(products);
            } catch (e) {
                expect(e.message).to.be.deep.equal('NO PRODUCTS FOUND');
            }
        });
    });
});
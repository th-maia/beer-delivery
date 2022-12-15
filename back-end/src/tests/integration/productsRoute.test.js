const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require("sequelize");

const app = require('../../api/app');
const products = require('../mocks/products');

chai.use(sinonChai);
chai.use(chaiHttp);

describe ('Testes da rota Products', () => {
    describe('Teste se é retornado um array de produtos com sucesso', () => {
        beforeEach(async () => {
            sinon
            .stub(Model, 'findAll')
            .onFirstCall()
            .resolves(products);
        });
        afterEach(() => sinon.restore());
        it('Deve ser retornar um array de produtos', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/products')
                .send();
            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.be.deep.equal(products);
        });
    });

    describe('Teste se caso ocorra algum erro', () => {
        beforeEach(async () => {
            sinon
            .stub(Model, 'findAll')
            .onFirstCall()
            .resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Deve ser retornado uma mensagem de erro "NO PRODUCTS FOUND"', async () => {
            const httpResponse = await chai
            .request(app)
            .get('/products')
            .send();
        expect(httpResponse.status).to.equal(404);
        expect(httpResponse.body).to.be.deep.equal({ message: 'NO PRODUCTS FOUND' });
        });
    });
});
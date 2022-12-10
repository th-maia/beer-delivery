const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');
const { describe } = require('mocha');
const { allSellers } = require('../../mocks/sellers');
const { getSellers, getAllSalesBySeller } = require('../../../api/services/Seller.service');
const { allSales } = require('../../mocks/sales');

describe ('Testes da rota sellers, camada service', () => {
    describe('Visualizar todos os vendedores', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(allSellers);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas os vendedores', async () => {
            const sellers = await getSellers();
            expect(sellers).to.be.deep.equal(allSellers);
        });
    });

    describe('Teste se não existir nenhuma vendedor a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for encontrado nenhum vendedor', async () => {
            try {
                const sales = await getSellers();
            } catch (err) {
                expect(err.message).to.be.deep.equal('NO SELLER FOUND');
            }
        });
    });

    describe('Visualizar as vendas', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(allSales);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas as vendas realizadas pelo vendedor', async () => {
            const sales = await getAllSalesBySeller(1);
            expect(sales).to.be.deep.equal(allSales);
        });
    });

    describe('Teste se não existir nenhuma venda a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não existir nenhuma venda a ser mostrada', async () => {
            try {
                const sales = await getAllSalesBySeller(99);
            } catch (err) {
                expect(err.message).to.be.deep.equal('NO SALES FOUND FOR THIS SELLER');
            }
        });
    });
});
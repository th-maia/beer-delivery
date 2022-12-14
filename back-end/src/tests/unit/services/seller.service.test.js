const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');
const { describe } = require('mocha');
const { allSellers } = require('../../mocks/sellers');
const { getSellers, getAllSalesBySeller, updateSalesBySeller } = require('../../../api/services/Seller.service');
const { allSales, updateSaleResponse } = require('../../mocks/sales');
const CustomHttpError = require('../../../api/middlewares/CustomHttpError');

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
            sinon.stub(Model, 'findAll').resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for encontrado nenhum vendedor', async () => {
            try {
                const sales = await getSellers();
            } catch (err) {
                expect(err).to.be.instanceOf(CustomHttpError);
                expect(err.status).to.be.deep.equal(404);
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
    
    describe('Atualizar o status de uma venda', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'update').resolves('UPDATED');
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível atualizar o status da venda', async () => {
            const sales = await updateSalesBySeller(1, 'Preparando');
            expect(sales).to.be.deep.equal('UPDATED');
        });
    });

    describe('Teste se não for possível atualizar o status de uma venda', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'update').resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Não é possível atualizar o status da venda', async () => {
            try {
                const sales = await updateSalesBySeller(0, 'Preparando');
            } catch (err) {
                expect(err.message).to.be.deep.equal('NOT UPDATED');
            }
        });
    });

    describe('Teste se não for possível atualizar o status de uma venda quando se passa o status errado', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'update').resolves('UPDATE NOT ALLOWED');
        });
        afterEach(() => sinon.restore());
        it('Não é possível atualizar o status da venda', async () => {
            try {
                const sales = await updateSalesBySeller(0, 'Entregue');
            } catch (err) {
                expect(err.message).to.be.deep.equal('UPDATE NOT ALLOWED');
            }
        });
    });
});
const { expect } = require('chai');
const sinon = require('sinon');
const { Model } = require('sequelize');
const { describe } = require('mocha');
const { newSaleResponse, newSaleRequest, allSales, productsSale } = require('../../mocks/sales');
const { createNewSale, getAllSales, getSalesProduct, checkout } = require('../../../api/services/Sales.service');

describe ('Testes da rota sales, camada service', () => {
    describe('Teste se é realizado uma venda é realizada com sucesso', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'create').resolves(newSaleResponse);
        });
        afterEach(() => sinon.restore());
        it('Deve ser feito uma venda com sucesso e retornar a venda', async () => {
            const newSale = await createNewSale(1, newSaleRequest);
            expect(newSale).to.be.deep.equal(newSaleResponse);
        });
    });

    describe('Teste se ocorrer algum erro', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'create').resolves(newSaleResponse);
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for passado um dos parâmetros', async () => {
            try {
                const user = await createNewSale(newSaleRequest);
            } catch (err) {
                expect(err.message).to.be.deep.equal('SALE NOT FINISHED');
            }
        });
    });

    describe('Visualizar as compras', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(allSales);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas as compras', async () => {
            const sales = await getAllSales(1);
            expect(sales).to.be.deep.equal(allSales);
        });
    });

    describe('Teste se não existir nenhuma compra a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for passado um dos parâmetros', async () => {
            try {
                const sales = await getAllSales(1);
            } catch (err) {
                expect(err.message).to.be.deep.equal('NO SALES FOUND FOR THIS USER');
            }
        });
    });

    describe('Visualizar os produtos de uma compra específica', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(productsSale);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todos os produtos da compra', async () => {
            const sales = await getSalesProduct(1);
            expect(sales).to.be.deep.equal(productsSale);
        });
    });

    describe('Teste se não existir nenhuma compra e produtos a serem visualizados', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves();
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não existir produtos nem venda, mas for pesquisado os produtos com id errado', async () => {
            try {
                const products = await getSalesProduct(99);
            } catch (err) {
                expect(err.message).to.be.deep.equal('NO PRODUCTS FOUND FOR THIS SALE');
            }
        });
    });

    describe('Atualizar o status de uma venda para entregue', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'update').resolves('DELIVERED');
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível atualizar o status da venda', async () => {
            const sales = await checkout(1, 'Entregue');
            expect(sales).to.be.deep.equal('DELIVERED');
        });
    });

    describe('Teste se não for possível atualizar o status de uma venda', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'update').resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Não é possível atualizar o status da venda', async () => {
            try {
                const sales = await checkout(0, 'Entregue');
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
                const sales = await checkout(0, 'Preparando');
            } catch (err) {
                expect(err.message).to.be.deep.equal('UPDATE NOT ALLOWED');
            }
        });
    });
});
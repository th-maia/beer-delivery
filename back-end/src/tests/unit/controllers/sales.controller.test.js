// const { expect } = require('chai');
// const sinon = require('sinon');
// const chai = require("chai");
// const sinonChai = require("sinon-chai");

// const { Model } = require('sequelize');
// const { describe } = require('mocha');
// const { newSaleResponse, newSaleRequest, allSales, productsSale } = require('../../mocks/sales');
// const salesService = require('../../../api/services/Sales.service');
// const salesController = require('../../../api/controllers/Sales.controller');

// chai.use(sinonChai);

// describe ('Testes da rota sales, camada controller', () => {
//     describe('Teste se é realizado uma venda com com sucesso', () => {
//         beforeEach(async () => {
//             sinon.stub(salesService, 'createNewSale').resolves(newSaleResponse);
//         });
//         afterEach(() => sinon.restore());
//         it('Deve ser feito uma venda com sucesso e retornar a venda', async () => {
//             const res = {};
//             const req = { headers: { id: 1 }, body: newSaleRequest };

//             res.status = sinon.stub().returns(res);
//             res.json = sinon.stub().returns();

//             await salesController.newSale(req, res);

//             expect(res.status).to.have.been.calledWith(201);
//             expect(res.json).to.have.been.calledWith(newSaleResponse);
//         });
//     });

//     // describe('Teste se ocorrer algum erro', () => {
//     //     beforeEach(async () => {
//     //         sinon.stub(Model, 'create').resolves(newSaleResponse);
//     //     });
//     //     afterEach(() => sinon.restore());
//     //     it('Deve retornar um erro, quando não for passado um dos parâmetros', async () => {
//     //         try {
//     //             const user = await createNewSale(newSaleRequest);
//     //         } catch (err) {
//     //             expect(err.message).to.be.deep.equal('SALE NOT FINISHED');
//     //         }
//     //     });
//     // });

//     // describe('Visualizar as compras', () => {
//     //     beforeEach(async () => {
//     //         sinon.stub(Model, 'findAll').resolves(allSales);
//     //     });
//     //     afterEach(() => sinon.restore());
//     //     it('Deve ser possível visualizar todas as compras', async () => {
//     //         const sales = await getAllSales(1);
//     //         expect(sales).to.be.deep.equal(allSales);
//     //     });
//     // });

//     // describe('Teste se não existir nenhuma compra a ser visualizada', () => {
//     //     beforeEach(async () => {
//     //         sinon.stub(Model, 'findAll').resolves();
//     //     });
//     //     afterEach(() => sinon.restore());
//     //     it('Deve retornar um erro, quando não for passado um dos parâmetros', async () => {
//     //         try {
//     //             const sales = await getAllSales(1);
//     //         } catch (err) {
//     //             expect(err.message).to.be.deep.equal('NO SALES FOUND FOR THIS USER');
//     //         }
//     //     });
//     // });

//     // describe('Visualizar os produtos de uma compra específica', () => {
//     //     beforeEach(async () => {
//     //         sinon.stub(Model, 'findAll').resolves(productsSale);
//     //     });
//     //     afterEach(() => sinon.restore());
//     //     it('Deve ser possível visualizar todos os produtos da compra', async () => {
//     //         const sales = await getSalesProduct(1);
//     //         expect(sales).to.be.deep.equal(productsSale);
//     //     });
//     // });

//     // describe('Teste se não existir nenhuma compra e produtos a serem visualizados', () => {
//     //     beforeEach(async () => {
//     //         sinon.stub(Model, 'findAll').resolves();
//     //     });
//     //     afterEach(() => sinon.restore());
//     //     it('Deve retornar um erro, quando não existir produtos nem venda, mas for pesquisado os produtos com id errado', async () => {
//     //         try {
//     //             const products = await getSalesProduct(99);
//     //         } catch (err) {
//     //             expect(err.message).to.be.deep.equal('NO PRODUCTS FOUND FOR THIS SALE');
//     //         }
//     //     });
//     // });
// });
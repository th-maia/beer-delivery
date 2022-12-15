const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require("sequelize");

const app = require('../../api/app');
const { 
        newSaleResponse, 
        newSaleRequest,
        allSales, 
        productsSale, 
        newSaleError,
        updateSaleResponse,
     } = require('../mocks/sales');
const { customer } = require("../mocks/users");

chai.use(sinonChai);
chai.use(chaiHttp);

const tokenCustomer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjcxMTQxODM1LCJleHAiOjE2NzMyMTU0MzV9.Jl8WJGWNSkP4PMCoMaAThFvOUeyg1vEPA8a8Ab92EsM';

describe ('Testes da rota Sales', () => {
    describe('Teste se é realizado uma compra é realizada com sucesso', () => {
        beforeEach(async () => sinon.stub(Model, 'create').resolves(newSaleResponse));
        afterEach(() => sinon.restore());
        it('Deve ser feito uma compra com sucesso e retornar a venda', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/sales')
                .set('Authorization', tokenCustomer)
                .send(newSaleRequest);
            
            expect(httpResponse.status).to.equal(201);
            expect(httpResponse.body).to.have.been.deep.equal(newSaleResponse);
        });
    });
    describe('Teste se é realizado uma compra não é realizada com sucesso', () => {
        beforeEach(async () => sinon.stub(Model, 'create').resolves(undefined));
        afterEach(() => sinon.restore());
        it('Deve ser feito uma compra com sucesso e retornar a venda', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/sales')
                .set('authorization', tokenCustomer)
                .send(newSaleRequest);
            expect(httpResponse.status).to.equal(500);
            expect(httpResponse.body).to.have.been.deep.equal({ message: 'SALE NOT FINISHED' });
        });
    });
    describe('Teste se algum parâmetro não for passado', () => {
        beforeEach(async () => sinon.stub(Model, 'create').resolves(undefined));
        afterEach(() => sinon.restore());
        it('Deve retornar um erro 422', async () => {
            const httpResponse = await chai
                .request(app)
                .post('/sales')
                .set('authorization', tokenCustomer)
                .send(newSaleError);
            expect(httpResponse.status).to.equal(422);
        });
    });


    describe('Visualizar as compras', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(allSales);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas as compras', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/sales')
                .set('authorization', tokenCustomer)
                .send();
            
            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.have.been.deep.equal(allSales);
        });
    });

    describe('Teste se não existir nenhuma compra a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll')
            .onFirstCall()
            .resolves(customer)
            .onSecondCall()
            .resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for passado um dos parâmetros', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/sales')
                .set('Authorization', tokenCustomer)
                .send();
            
            expect(httpResponse.status).to.equal(404);
            expect(httpResponse.body).to.have.been.deep.equal({ message: 'NO SALES FOUND FOR THIS USER' });
        });
    });

    describe('Visualizar os produtos de uma compra específica', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(productsSale);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todos os produtos da compra', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/sales/1')
                .set('Authorization', tokenCustomer)
                .send();
            
            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.have.been.deep.equal(productsSale);
        });
    });

    describe('Teste se não existir nenhuma compra e produtos a serem visualizados', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll')
            .onFirstCall()
            .resolves(customer)
            .onSecondCall()
            .resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não existir produtos nem venda, mas for pesquisado os produtos com id errado', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/sales/1')
                .set('Authorization', tokenCustomer)
                .send();
            
            expect(httpResponse.status).to.equal(404);
            expect(httpResponse.body).to.have.been.deep.equal({ message: 'NO PRODUCTS FOUND FOR THIS SALE'});
        });
    });

    describe('Atualizar o status de uma venda', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'update').resolves(updateSaleResponse);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível atualizar o status da venda', async () => {
            const httpResponse = await chai
            .request(app)
            .put('/sales/1')
            .set('Authorization', tokenCustomer)
            .send({ status: 'Entregue' });

        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.have.been.deep.equal({ message: 'DELIVERED' });
        });
    });

    describe('Teste se não for possível atualizar o status de uma venda', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'update').resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Não é possível atualizar o status da venda', async () => {
            const httpResponse = await chai
            .request(app)
            .put('/sales/1')
            .set('Authorization', tokenCustomer)
            .send({ status: 'Preparando' } );

        expect(httpResponse.status).to.equal(405);
        expect(httpResponse.body).to.have.been.deep.equal({ message: 'UPDATE NOT ALLOWED' });
        });
    });

    describe('Teste se não for possível atualizar o status de uma venda inexistente', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'update').resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Não é possível atualizar o status da venda', async () => {
            const httpResponse = await chai
            .request(app)
            .put('/sales/1')
            .set('Authorization', tokenCustomer)
            .send({ status: 'Entregue' } );

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.have.been.deep.equal({ message: 'NOT UPDATED' });
        });
    });

    describe('Teste se o token não existir', () => {
        beforeEach(() => {
            sinon.stub(Model, 'findAll')
            .onFirstCall()
            .resolves(undefined)
            .onSecondCall()
            .resolves({ message: 'NO TOKEN FOUND'});
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for encontrado nenhum token', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/sales')
                .send();
            expect(httpResponse.status).to.equal(403);
            expect(httpResponse.body).to.be.deep.equal({ message: 'NO TOKEN FOUND'});
        });
    });

    describe('Teste se o user do user não existir', () => {
        beforeEach(() => {
            sinon.stub(Model, 'findOne').resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for encontrado nenhum user', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/sales')
                .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJjbGllbnRlQGVtYWlsLmNvbSIsIm5hbWUiOiJjbGllbnRldGVzdGUiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzEwNjQ1NjYsImV4cCI6MTY3MzEzODE2Nn0.6U6m6Hczw8cd50JXI3Laeu0Oa9NzhVPwP39PadT8Llg')
                .send();
            
            expect(httpResponse.status).to.equal(403);
            expect(httpResponse.body).to.be.deep.equal({ message: 'USER NOT FOUND. INVALID TOKEN'});
        });
    });
});
const chai = require("chai");
const sinonChai = require("sinon-chai");
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = require('chai');
const { describe } = require('mocha');
const { Model } = require("sequelize");

const app = require('../../api/app');
const { users, customer, administrator } = require('../mocks/users');

chai.use(sinonChai);
chai.use(chaiHttp);
const tokenAdm = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1AZGVsaXZlcnlhcHAuY29tIiwibmFtZSI6IkRlbGl2ZXJ5IEFwcCBBZG1pbiIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaWF0IjoxNjcxMDYzMjc2LCJleHAiOjE2NzMxMzY4NzZ9.WuRhwaCbz8CmWdXH5lVVDpQ0LtJ0H3rhOKtCsqzhYBU';
const tokenCustomer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjcxMDYzMDE2LCJleHAiOjE2NzMxMzY2MTZ9.xBe-L8NQnnm5cvCfB_CSTKyZjdxfsdkOtrlM9-G9pGY';
describe ('Testes da rota adm', () => {
    describe('Visualizar todos os usuários', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll')
            .onFirstCall()
            .resolves(administrator)
            .onSecondCall()
            .resolves(users);
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível visualizar todas os usuários', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/adm')
                .set('Authorization', tokenAdm)
                .send();
            expect(httpResponse.status).to.equal(200);
            expect(httpResponse.body).to.be.deep.equal(users);
        });
    });
    describe('Teste se não existir nenhum usuário a ser visualizada', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll')
            .onFirstCall()
            .resolves(administrator)
            .onSecondCall()
            .resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for encontrado nenhum usuário', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/adm')
                .set('authorization', tokenAdm)
                .send();

            expect(httpResponse.status).to.equal(404);
            expect(httpResponse.body).to.be.deep.equal({ message: 'NO USERS FOUND'});
        });
    });
    describe('Teste se o token não for do administrador', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findOne').resolves(customer);
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/adm')
                .set('authorization', tokenCustomer)
                .send();

            expect(httpResponse.status).to.equal(403);
            expect(httpResponse.body).to.be.deep.equal({ message: 'USER IS NOT AN ADMINISTRATOR'});
        });
    });
    describe('Teste se o token não existir', () => {
        beforeEach(async () => {
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
                .get('/adm')
                .send();

            expect(httpResponse.status).to.equal(403);
            expect(httpResponse.body).to.be.deep.equal({ message: 'NO TOKEN FOUND'});
        });
    });
    describe('Teste se o user do token não existir', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'findAll').resolves(undefined);
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for encontrado nenhum token', async () => {
            const httpResponse = await chai
                .request(app)
                .get('/adm')
                .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJjbGllbnRlQGVtYWlsLmNvbSIsIm5hbWUiOiJjbGllbnRldGVzdGUiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NzEwNjQ1NjYsImV4cCI6MTY3MzEzODE2Nn0.6U6m6Hczw8cd50JXI3Laeu0Oa9NzhVPwP39PadT8Llg')
                .send();
            
            expect(httpResponse.status).to.equal(403);
            expect(httpResponse.body).to.be.deep.equal({ message: 'USER NOT FOUND. INVALID TOKEN'});
        });
    });
    describe('É possível deletar um usuário', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'destroy')
            .onFirstCall()
            .resolves(administrator)
            .onSecondCall()
            .resolves(customer)
            .onThirdCall()
            .resolves('USER DELETED');
        });
        afterEach(() => sinon.restore());
        it('Deve ser possível deletar um usuário', async () => {
            const httpResponse = await chai
                .request(app)
                .delete('/adm/3')
                .set('Authorization', tokenAdm);
            expect(httpResponse.status).to.equal(202);
            expect(httpResponse.body).to.be.deep.equal('USER DELETED');
        });
    });

    describe('Teste se não for possível deletar um usuário', () => {
        beforeEach(async () => {
            sinon.stub(Model, 'destroy')
            .onFirstCall()
            .resolves(undefined)
            .onSecondCall()
            .resolves('COULDNT DELETE USER');
        });
        afterEach(() => sinon.restore());
        it('Deve retornar um erro, quando não for possível deletar um usuário', async () => {
            const httpResponse = await chai
                .request(app)
                .delete('/adm/1')
                .set('authorization', tokenAdm);

            expect(httpResponse.status).to.equal(400);
            expect(httpResponse.body).to.be.deep.equal({ message: 'COULDNT DELETE USER'});
        });
    });
});